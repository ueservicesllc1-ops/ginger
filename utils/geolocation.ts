import { Geolocation } from '@capacitor/geolocation';

export interface Position {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
  timestamp?: number;
}

export async function getCurrentLocation(): Promise<Position> {
  try {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    });

    return {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
      accuracy: coordinates.coords.accuracy,
      altitude: coordinates.coords.altitude || undefined,
      altitudeAccuracy: coordinates.coords.altitudeAccuracy || undefined,
      heading: coordinates.coords.heading || undefined,
      speed: coordinates.coords.speed || undefined,
      timestamp: coordinates.timestamp,
    };
  } catch (error) {
    console.error('Error obteniendo ubicación:', error);
    throw error;
  }
}

export async function watchPosition(
  callback: (position: Position) => void
): Promise<string> {
  const watchId = await Geolocation.watchPosition(
    {
      enableHighAccuracy: true,
    },
    (coordinates, err) => {
      if (err) {
        console.error('Error en watchPosition:', err);
        return;
      }

      if (!coordinates) return;
      callback({
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        accuracy: coordinates.coords.accuracy,
        altitude: coordinates.coords.altitude || undefined,
        altitudeAccuracy: coordinates.coords.altitudeAccuracy || undefined,
        heading: coordinates.coords.heading || undefined,
        speed: coordinates.coords.speed || undefined,
        timestamp: coordinates.timestamp,
      });
    }
  );

  return watchId;
}

export async function clearWatch(watchId: string): Promise<void> {
  await Geolocation.clearWatch({ id: watchId });
}


