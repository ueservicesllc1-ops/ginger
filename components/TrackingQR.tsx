'use client';

import { QRCodeSVG } from 'qrcode.react';

interface TrackingQRProps {
  trackingId: string;
  size?: number;
}

export default function TrackingQR({ trackingId, size = 128 }: TrackingQRProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <QRCodeSVG value={trackingId} size={size} />
      <p className="text-sm text-gray-600 font-mono">{trackingId}</p>
    </div>
  );
}


