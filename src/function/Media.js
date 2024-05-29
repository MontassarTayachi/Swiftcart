class MediaConverter {
    static async convertUrlToFile(mediaUrl, fileName, mimeType) {
      try {
        const response = await fetch(mediaUrl);
        if (!response.ok) throw new Error('Network response was not ok.');
        const mediaBlob = await response.blob();
        const mediaFile = new File([mediaBlob], fileName, { type: mimeType || mediaBlob.type });
  
        return mediaFile;
      } catch (error) {
        console.error('Error converting media URL to File:', error);
        return null;
      }
    }
    static arrayMoveImmutable(array, fromIndex, toIndex) {
      const arrayCopy = [...array]; // Create a copy of the array to avoid mutation
      const startIndex = fromIndex < 0 ? arrayCopy.length + fromIndex : fromIndex;
      if (startIndex >= 0 && startIndex < arrayCopy.length) {
        const endIndex = toIndex < 0 ? arrayCopy.length + toIndex : toIndex;
        const [item] = arrayCopy.splice(startIndex, 1);
        arrayCopy.splice(endIndex, 0, item);
      }
      return arrayCopy;
    }

    static determinerTypeDeLien(url) {
      // Regex pour détecter l'extension de fichier dans l'URL
      const patternExtension = /\.(jpg|jpeg|png|gif|bmp|webp|mp4|avi|mov|wmv|flv)$/i;
      const matchExtension = url.match(patternExtension);
    
      if (matchExtension) {
        // Mapping des extensions de fichier aux types MIME
        const mimeTypes = {
          jpg: 'image/jpeg',
          jpeg: 'image/jpeg',
          png: 'image/png',
          gif: 'image/gif',
          bmp: 'image/bmp',
          webp: 'image/webp',
          mp4: 'video/mp4',
          avi: 'video/x-msvideo',
          mov: 'video/quicktime',
          wmv: 'video/x-ms-wmv',
          flv: 'video/x-flv',
        };
    
        // Convertir l'extension en minuscule pour la recherche dans le mapping
        const extension = matchExtension[1].toLowerCase();
        return mimeTypes[extension] || 'inconnu';
      }
    
      // Regex pour détecter des liens de vidéo populaires sans extension spécifique
      const patternVideoSites = /youtube\.com|vimeo\.com|dailymotion\.com|youtu\.be/i;
      if (patternVideoSites.test(url)) {
        return 'video'; // Dans ce cas, nous ne pouvons pas déterminer le type MIME exact
      }
    
      // Retourne 'inconnu' si l'URL ne correspond à aucun motif connu
      return 'inconnu';
    }
    
    
  }
  
  
  export default MediaConverter;
  