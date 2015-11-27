/**
 * Picks the (seemingly) best supported source format.
 * 
 * Media support can be either "probably", "maybe" or "" (unsupported).
 * If there's a format that's "probably" supported, it will be returned, else
 * the first "maybe" supported one will be returned as a fallback.
 * 
 * If there are no supported formats, null will be returned.
 * 
 * @param  array  types An array of format descriptors
 * @return object       A format descriptor or null
 */
function playerPickFormat(types) {
  var testAudio = new Audio();
  var maybe = undefined;
  
  for (var i in types) {
    var type = types[i];
    var status = testAudio.canPlayType(type.mime);
    
    if (status == 'probably') {
      return type;
    } else if (status == 'maybe' && !maybe) {
      maybe = type;
    }
  }
  
  return maybe || null;
}

/**
 * Returns the full URL for a piece of media.
 * 
 * @param  string   id      Media ID (filename minus extension)
 * @param  string   baseURL Base URL for media files
 * @param  object   type    Format descriptor
 * @return string           Full URL for the file
 */
function playerURLFor(id, baseURL, type) {
  return baseURL + id + "." + type.ext;
}
