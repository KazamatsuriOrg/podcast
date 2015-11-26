---
---

var audioBaseURL = '{{ site.audio_baseurl }}';
var audioExtensions = [{% for type in site.audio_types %}'{{ type.ext }}',{% endfor %}];
