import os

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

start_marker = "      <!-- Trust: логотипы брендов -->"
end_marker = '    <!-- ══════════ 5. ЭТАПЫ РАБОТЫ ══════════ -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    brands_html = """      <!-- Trust: логотипы брендов -->
      <div class="brand-logos-wrap">
        
        <!-- Базовый серый слой -->
        <div class="marquee-track-container">
          <div class="brand-logos" role="list">
            <div class="brand-logos-group">
"""
    for i in range(1, 15):
        brands_html += f'              <img src="assets/logos/logo_brand/{i}.webp" alt="Бренд {i}" class="brand-logo" width="80" height="35" loading="lazy">\n'
    
    brands_html += """            </div>
            <div class="brand-logos-group brand-logos-clone" aria-hidden="true">
"""
    for i in range(1, 15):
        brands_html += f'              <img src="assets/logos/logo_brand/{i}.webp" alt="Бренд {i}" class="brand-logo" width="80" height="35" loading="lazy">\n'
    
    brands_html += """            </div>
          </div>
        </div>

        <!-- Цветной слой, виден только по центру (маска на контейнере) -->
        <div class="marquee-track-container marquee-colored-container brand-logos-clone" aria-hidden="true" role="none">
          <div class="brand-logos brand-logos--colored-track">
            <div class="brand-logos-group">
"""
    for i in range(1, 15):
        brands_html += f'              <img src="assets/logos/logo_brand/{i}.webp" alt="Бренд {i}" class="brand-logo" width="80" height="35" loading="lazy">\n'

    brands_html += """            </div>
            <div class="brand-logos-group brand-logos-clone" aria-hidden="true">
"""
    for i in range(1, 15):
        brands_html += f'              <img src="assets/logos/logo_brand/{i}.webp" alt="Бренд {i}" class="brand-logo" width="80" height="35" loading="lazy">\n'

    brands_html += """            </div>
          </div>
        </div>

        <p class="brand-logos-caption">…и ещё 126+ брендов</p>
      </div>
    </section>

"""
    new_content = content[:start_idx] + brands_html + content[end_idx:]
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Successfully updated index.html")
else:
    print("Markers not found!")

