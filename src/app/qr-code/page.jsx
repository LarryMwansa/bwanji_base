"use client"

import { useState } from 'react';
import React, { useRef, useEffect } from "react";
import styles from "./QRCodeGenerator.module.css";
import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeGenerator() {
  const [type, setType] = useState('text');
  const [fields, setFields] = useState({
    text: 'https://qr-code.bwanji.digital.com',
    email: '',
    phone: '',
    wifi_ssid: '',
    wifi_password: '',
    wifi_encryption: 'WPA',
    event_summary: '',
    event_location: '',
    event_start: '',
    event_end: '',
    vcard_name: '',
    vcard_phone: '',
    vcard_email: '',
    vcard_org: '',
  });
  const [size, setSize] = useState(238); // Default to small
  const [encoding, setEncoding] = useState('UTF-8'); // Default encoding
  const [dpi, setDpi] = useState(300); // Default DPI
  const [logo, setLogo] = useState(null); // Logo image data URL
  const [showSettings, setShowSettings] = useState(false); // Toggle settings panel
  const qrRef = useRef(null);
  const [isDark, setIsDark] = useState(true);

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setLogo(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Function to download QR code as PNG
  const handleDownload = async () => {
    const qrValue = getQrValue();
    if (!qrValue || qrValue.trim() === '') return;
    // Create a hidden container for the QRCodeSVG
    const exportSize = size;
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);
    // Use React to render QRCodeSVG at exportSize
    const React = await import('react');
    const { createRoot } = await import('react-dom/client');
    const root = createRoot(tempDiv);
    root.render(
      React.createElement(QRCodeSVG, {
        value: qrValue,
        size: exportSize,
        imageSettings: logo ? {
          src: logo,
          height: Math.round(exportSize * 0.15),
          width: Math.round(exportSize * 0.15),
          excavate: true
        } : undefined
      })
    );
    // Wait for the SVG to render
    setTimeout(() => {
      const svg = tempDiv.querySelector('svg');
      if (!svg) {
        document.body.removeChild(tempDiv);
        return;
      }
      const serializer = new XMLSerializer();
      const svgStr = serializer.serializeToString(svg);
      const scale = dpi / 96;
      const canvasSize = Math.round(exportSize * scale);
      const canvas = document.createElement('canvas');
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const ctx = canvas.getContext('2d');
      const img = new window.Image();
      img.onload = function () {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
        const pngFile = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `qrcode_${dpi}dpi.png`;
        link.href = pngFile;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        document.body.removeChild(tempDiv);
      };
      img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgStr)));
    }, 100);
  };
     

  // Format QR value based on type and encoding
  const encodeValue = (value) => {
    if (encoding === 'UTF-8') return value;
    if (encoding === 'ANSI') {
      // Simulate ANSI by stripping non-ASCII chars
      return value.replace(/[^\x00-\x7F]/g, '');
    }
    if (encoding === 'Cyrillic') {
      // Simulate Cyrillic by encoding to windows-1251 (not natively supported in JS, so just tag)
      return `Cyrillic:${value}`;
    }
    return value;
  };

  const getQrValue = () => {
    let rawValue = '';
    switch (type) {
      case 'email':
        rawValue = `mailto:${fields.email}`;
        break;
      case 'phone':
        rawValue = `tel:${fields.phone}`;
        break;
      case 'wifi':
        rawValue = `WIFI:T:${fields.wifi_encryption};S:${fields.wifi_ssid};P:${fields.wifi_password};;`;
        break;
      case 'event':
        rawValue = `BEGIN:VEVENT\nSUMMARY:${fields.event_summary}\nLOCATION:${fields.event_location}\nDTSTART:${fields.event_start.replace(/[-:]/g, '')}\nDTEND:${fields.event_end.replace(/[-:]/g, '')}\nEND:VEVENT`;
        break;
      case 'vcard':
        rawValue = `BEGIN:VCARD\nVERSION:3.0\nFN:${fields.vcard_name}\nORG:${fields.vcard_org}\nTEL:${fields.vcard_phone}\nEMAIL:${fields.vcard_email}\nEND:VCARD`;
        break;
      default:
        rawValue = fields.text;
    }
    return encodeValue(rawValue);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>QR Code Generator</h1>
      <div className={styles.topbar}>
        <label className={styles.label}>
          Type:
          <select value={type} onChange={e => setType(e.target.value)} className={styles.select}>
            <option value="text">Text/URL</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="wifi">WiFi</option>
            <option value="event">Event</option>
            <option value="vcard">vCard</option>
          </select>
        </label>
        {/* Dynamic input fields */}
        {type === 'text' && (
          <input
            type="text"
            value={fields.text}
            onChange={e => setFields(f => ({ ...f, text: e.target.value }))}
            placeholder="Enter text or URL"
            style={{ padding: '0.5rem', width: '220px' }}
          />
        )}
        {type === 'email' && (
          <input
            type="email"
            value={fields.email}
            onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
            placeholder="Enter email address"
            style={{ padding: '0.5rem', width: '220px' }}
          />
        )}
        {type === 'phone' && (
          <input
            type="tel"
            value={fields.phone}
            onChange={e => setFields(f => ({ ...f, phone: e.target.value }))}
            placeholder="Enter phone number"
            style={{ padding: '0.5rem', width: '220px' }}
          />
        )}
        {type === 'wifi' && (
          <>
            <input
              type="text"
              value={fields.wifi_ssid}
              onChange={e => setFields(f => ({ ...f, wifi_ssid: e.target.value }))}
              placeholder="WiFi SSID"
              style={{ padding: '0.5rem', width: '120px' }}
            />
            <input
              type="text"
              value={fields.wifi_password}
              onChange={e => setFields(f => ({ ...f, wifi_password: e.target.value }))}
              placeholder="WiFi Password"
              style={{ padding: '0.5rem', width: '120px' }}
            />
            <select
              value={fields.wifi_encryption}
              onChange={e => setFields(f => ({ ...f, wifi_encryption: e.target.value }))}
              style={{ padding: '0.3rem', width: '100px' }}
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None</option>
            </select>
          </>
        )}
        {type === 'event' && (
          <>
            <input
              type="text"
              value={fields.event_summary}
              onChange={e => setFields(f => ({ ...f, event_summary: e.target.value }))}
              placeholder="Event Summary"
              style={{ padding: '0.5rem', width: '120px' }}
            />
            <input
              type="text"
              value={fields.event_location}
              onChange={e => setFields(f => ({ ...f, event_location: e.target.value }))}
              placeholder="Event Location"
              style={{ padding: '0.5rem', width: '120px' }}
            />
            <input
              type="datetime-local"
              value={fields.event_start}
              onChange={e => setFields(f => ({ ...f, event_start: e.target.value }))}
              style={{ padding: '0.5rem', width: '150px' }}
            />
            <input
              type="datetime-local"
              value={fields.event_end}
              onChange={e => setFields(f => ({ ...f, event_end: e.target.value }))}
              style={{ padding: '0.5rem', width: '150px' }}
            />
          </>
        )}
        {type === 'vcard' && (
          <>
            <input
              type="text"
              value={fields.vcard_name}
              onChange={e => setFields(f => ({ ...f, vcard_name: e.target.value }))}
              placeholder="Full Name"
              style={{ padding: '0.5rem', width: '120px' }}
            />
            <input
              type="tel"
              value={fields.vcard_phone}
              onChange={e => setFields(f => ({ ...f, vcard_phone: e.target.value }))}
              placeholder="Phone Number"
              style={{ padding: '0.5rem', width: '120px' }}
            />
            <input
              type="email"
              value={fields.vcard_email}
              onChange={e => setFields(f => ({ ...f, vcard_email: e.target.value }))}
              placeholder="Email Address"
              style={{ padding: '0.5rem', width: '120px' }}
            />
            <input
              type="text"
              value={fields.vcard_org}
              onChange={e => setFields(f => ({ ...f, vcard_org: e.target.value }))}
              placeholder="Organization"
              style={{ padding: '0.5rem', width: '120px' }}
            />
          </>
        )}
        <label>
          Logo (centered):
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        <label>
          Size:
          <select value={size} onChange={e => setSize(Number(e.target.value))} style={{ marginLeft: '0.5rem', padding: '0.3rem' }}>
            <option value={238}>Small (238px)</option>
            <option value={938}>Medium (938px)</option>
            <option value={1238}>Large (1238px)</option>
          </select>
        </label>
        <label>
          Encoding:
          <select value={encoding} onChange={e => setEncoding(e.target.value)} style={{ marginLeft: '0.5rem', padding: '0.3rem' }}>
            <option value="UTF-8">UTF-8</option>
            <option value="ANSI">ANSI</option>
            <option value="Cyrillic">Cyrillic</option>
          </select>
        </label>
        <label>
          DPI:
          <select
            value={dpi}
            onChange={e => setDpi(Number(e.target.value))}
            style={{ marginLeft: '0.5rem', padding: '0.3rem', width: '100px' }}
          >
            <option value={72}>72 DPI</option>
            <option value={150}>150 DPI</option>
            <option value={300}>300 DPI (default)</option>
            <option value={450}>450 DPI</option>
            <option value={600}>600 DPI</option>
          </select>
        </label>
      </div>
      {/* QR code preview and download */}
      {(
        (type === 'text' && fields.text.trim()) ||
        (type === 'email' && fields.email.trim()) ||
        (type === 'phone' && fields.phone.trim()) ||
        (type === 'wifi' && fields.wifi_ssid.trim()) ||
        (type === 'event' && fields.event_summary.trim()) ||
        (type === 'vcard' && fields.vcard_name.trim())
      ) && (
        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '238px', height: '238px' }}>
            <QRCodeSVG
              id="qr-svg"
              value={getQrValue()}
              size={238}
              imageSettings={logo ? {
                src: logo,
                height: Math.round(238 * 0.15),
                width: Math.round(238 * 0.15),
                excavate: true
              } : undefined}
            />
          </div>
          <button onClick={handleDownload} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
            Download QR Code
          </button>
        </div>
      )}
    </main>
  );
}
