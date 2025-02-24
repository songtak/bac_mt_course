import GPXParser from 'gpxparser';

export const parseGpx = (file: File): Promise<[number, number][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const gpx = new GPXParser();
        gpx.parse(e.target?.result as string);
        
        if (gpx.tracks.length === 0) {
          reject(new Error('No tracks found in GPX file'));
          return;
        }

        const coordinates: [number, number][] = [];
        
        gpx.tracks.forEach(track => {
          track.points.forEach(point => {
            coordinates.push([point.lat, point.lon]);
          });
        });

        resolve(coordinates);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};