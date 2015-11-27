---
---

var audioBaseURL = '{{ site.audio_baseurl }}';
var audioTypes = [
  {% for type in site.audio_types %}
  {
    name: '{{ type.name }}',
    ext: '{{ type.ext }}',
    mime: '{{ type.mime }}',
  },
  {% endfor %}
];
