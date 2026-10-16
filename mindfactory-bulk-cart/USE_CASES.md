# 💼 Use Cases & Beispiele

## 1. 🎮 PC-Konfigurator Integration

### Szenario
Du betreibst eine Website mit einem PC-Konfigurator und möchtest Nutzern ermöglichen, die Komponenten direkt bei Mindfactory zu kaufen.

### Implementierung

```javascript
// PC-Konfigurator Backend
class PCConfigurator {
    constructor() {
        this.components = [];
    }
    
    addComponent(mindfactoryId, quantity = 1) {
        this.components.push({ id: mindfactoryId, quantity });
    }
    
    generateMindfactoryURL(autostart = true) {
        const articles = this.components
            .map(c => c.quantity > 1 ? `${c.id}:${c.quantity}` : c.id)
            .join(',');
        
        const base = 'https://www.mindfactory.de/';
        const params = `?articles=${articles}`;
        const auto = autostart ? '&autostart=1' : '';
        
        return `${base}${params}${auto}`;
    }
}

// Verwendung
const pc = new PCConfigurator();
pc.addComponent('1234567', 1);  // CPU
pc.addComponent('9876543', 1);  // Mainboard
pc.addComponent('1357924', 2);  // RAM 2x
pc.addComponent('4567890', 1);  // GPU

const url = pc.generateMindfactoryURL();
console.log(url);
// https://www.mindfactory.de/?articles=1234567,9876543,1357924:2,4567890&autostart=1
```

### HTML-Button

```html
<button onclick="buyAtMindfactory()">
    🛒 Jetzt bei Mindfactory kaufen
</button>

<script>
function buyAtMindfactory() {
    const url = configurator.generateMindfactoryURL(true);
    window.open(url, '_blank');
}
</script>
```

---

## 2. 📊 Excel/CSV zu Mindfactory

### Szenario
Du hast eine Excel-Liste mit Artikelnummern und Mengen und möchtest diese schnell bei Mindfactory bestellen.

### Excel-Formeln

**Tabelle:**
| A (Artikel-ID) | B (Menge) | C (Formatiert) |
|----------------|-----------|----------------|
| 1234567 | 1 | =A2&":"&B2 |
| 9876543 | 2 | =A3&":"&B3 |
| 1357924 | 5 | =A4&":"&B4 |

**URL generieren:**
```excel
="https://www.mindfactory.de/?articles="&TEXTJOIN(",",TRUE,C2:C4)&"&autostart=1"
```

### Python-Script

```python
import pandas as pd

def generate_mindfactory_url(csv_file):
    df = pd.read_csv(csv_file)
    
    articles = []
    for _, row in df.iterrows():
        article_id = row['artikel_id']
        quantity = row.get('menge', 1)
        
        if quantity > 1:
            articles.append(f"{article_id}:{quantity}")
        else:
            articles.append(str(article_id))
    
    articles_param = ','.join(articles)
    url = f"https://www.mindfactory.de/?articles={articles_param}&autostart=1"
    
    return url

# Verwendung
url = generate_mindfactory_url('bestellung.csv')
print(url)
```

**bestellung.csv:**
```csv
artikel_id,menge
1234567,1
9876543,2
1357924,5
```

---

## 3. 🔖 Wiederkehrende Bestellungen als Bookmarks

### Szenario
Du bestellst regelmäßig die gleichen Komponenten und möchtest das vereinfachen.

### Browser-Bookmarks

```
Name: "Gaming PC Basis-Setup"
URL: https://www.mindfactory.de/?articles=1234567,9876543:2,1357924&autostart=1

Name: "Server RAM Upgrade (4x32GB)"
URL: https://www.mindfactory.de/?articles=4567890:4&autostart=1

Name: "Workstation Komplett"
URL: https://www.mindfactory.de/?articles=1111111,2222222,3333333:2,4444444&autostart=1
```

### Bookmarklet

Erstelle ein Bookmarklet für schnellen Zugriff:

```javascript
javascript:(function(){
    const articles = prompt('Artikelnummern (komma-getrennt):');
    if(articles) {
        window.open('https://www.mindfactory.de/?articles=' + articles + '&autostart=1', '_blank');
    }
})()
```

---

## 4. 📱 QR-Code für Smartphone-Shopping

### Szenario
Du möchtest eine Einkaufsliste per QR-Code teilen, die direkt am Smartphone geöffnet werden kann.

### Python - QR-Code generieren

```python
import qrcode

def create_mindfactory_qr(articles_dict, filename='mindfactory_cart.png'):
    """
    articles_dict: {'artikel_id': menge, ...}
    """
    articles = []
    for article_id, quantity in articles_dict.items():
        if quantity > 1:
            articles.append(f"{article_id}:{quantity}")
        else:
            articles.append(str(article_id))
    
    articles_param = ','.join(articles)
    url = f"https://www.mindfactory.de/?articles={articles_param}&autostart=1"
    
    qr = qrcode.QRCode(version=1, box_size=10, border=4)
    qr.add_data(url)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(filename)
    
    print(f"QR-Code gespeichert: {filename}")
    print(f"URL: {url}")

# Verwendung
pc_build = {
    '1234567': 1,  # CPU
    '9876543': 1,  # Mainboard
    '1357924': 2,  # RAM
    '4567890': 1,  # GPU
}

create_mindfactory_qr(pc_build, 'gaming_pc_build.png')
```

### Node.js - QR-Code generieren

```javascript
const QRCode = require('qrcode');

async function createMindfactoryQR(articles, filename) {
    const articlesParam = articles
        .map(a => a.quantity > 1 ? `${a.id}:${a.quantity}` : a.id)
        .join(',');
    
    const url = `https://www.mindfactory.de/?articles=${articlesParam}&autostart=1`;
    
    await QRCode.toFile(filename, url);
    console.log(`QR-Code gespeichert: ${filename}`);
    console.log(`URL: ${url}`);
}

// Verwendung
const pcBuild = [
    { id: '1234567', quantity: 1 },
    { id: '9876543', quantity: 1 },
    { id: '1357924', quantity: 2 },
];

createMindfactoryQR(pcBuild, 'gaming_pc.png');
```

---

## 5. 🤖 Discord/Slack Bot Integration

### Szenario
Ein Bot, der auf Discord/Slack PC-Konfigurationen empfiehlt und direkt einen Mindfactory-Link generiert.

### Discord Bot (Python)

```python
import discord
from discord.ext import commands

bot = commands.Bot(command_prefix='!')

@bot.command()
async def gaming_pc(ctx, budget: str):
    """Empfiehlt Gaming-PC basierend auf Budget"""
    
    configs = {
        'low': {
            'name': 'Budget Gaming PC (~800€)',
            'articles': ['1234567', '9876543', '1357924:2', '4567890']
        },
        'mid': {
            'name': 'Mid-Range Gaming PC (~1500€)',
            'articles': ['1111111', '2222222', '3333333:2', '4444444']
        },
        'high': {
            'name': 'High-End Gaming PC (~2500€)',
            'articles': ['5555555', '6666666', '7777777:2', '8888888']
        }
    }
    
    if budget.lower() not in configs:
        await ctx.send("Budget muss 'low', 'mid' oder 'high' sein!")
        return
    
    config = configs[budget.lower()]
    articles_param = ','.join(config['articles'])
    url = f"https://www.mindfactory.de/?articles={articles_param}&autostart=1"
    
    embed = discord.Embed(
        title=config['name'],
        description=f"Klicke auf den Link um alle Komponenten in den Warenkorb zu legen:",
        color=0xFF6600
    )
    embed.add_field(name="Mindfactory Link", value=url, inline=False)
    
    await ctx.send(embed=embed)

bot.run('YOUR_BOT_TOKEN')
```

### Verwendung
```
!gaming_pc mid
```

---

## 6. 🔄 API-Integration für Preisvergleich

### Szenario
Du betreibst einen Preisvergleich und möchtest "Jetzt kaufen"-Links zu Mindfactory generieren.

### REST API Endpoint

```python
from flask import Flask, request, jsonify, redirect

app = Flask(__name__)

@app.route('/api/mindfactory/cart', methods=['POST'])
def create_cart():
    """
    POST /api/mindfactory/cart
    Body: {
        "articles": [
            {"id": "1234567", "quantity": 1},
            {"id": "9876543", "quantity": 2}
        ],
        "autostart": true
    }
    """
    data = request.json
    articles = data.get('articles', [])
    autostart = data.get('autostart', False)
    
    if not articles:
        return jsonify({'error': 'No articles provided'}), 400
    
    articles_param = ','.join([
        f"{a['id']}:{a['quantity']}" if a['quantity'] > 1 else a['id']
        for a in articles
    ])
    
    url = f"https://www.mindfactory.de/?articles={articles_param}"
    if autostart:
        url += '&autostart=1'
    
    return jsonify({'url': url})

@app.route('/goto/mindfactory/<path:articles>')
def redirect_to_mindfactory(articles):
    """
    GET /goto/mindfactory/1234567,9876543:2
    Redirects to Mindfactory with articles
    """
    url = f"https://www.mindfactory.de/?articles={articles}&autostart=1"
    return redirect(url)

if __name__ == '__main__':
    app.run(debug=True)
```

### Frontend Integration

```javascript
// Preisvergleich-Seite
async function buyAtMindfactory(productId, quantity = 1) {
    const response = await fetch('/api/mindfactory/cart', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            articles: [{id: productId, quantity: quantity}],
            autostart: true
        })
    });
    
    const data = await response.json();
    window.open(data.url, '_blank');
}
```

---

## 7. 📧 E-Mail mit Einkaufsliste

### Szenario
Sende automatisch E-Mails mit vorkonfiguriertem Mindfactory-Link.

### Python E-Mail

```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_mindfactory_email(to_email, articles_dict, subject):
    articles = []
    for article_id, quantity in articles_dict.items():
        if quantity > 1:
            articles.append(f"{article_id}:{quantity}")
        else:
            articles.append(str(article_id))
    
    articles_param = ','.join(articles)
    url = f"https://www.mindfactory.de/?articles={articles_param}&autostart=1"
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = 'your@email.com'
    msg['To'] = to_email
    
    html = f"""
    <html>
      <body>
        <h2>Deine PC-Konfiguration ist bereit!</h2>
        <p>Klicke auf den Button um alle Komponenten automatisch in den Warenkorb zu legen:</p>
        <a href="{url}" style="background-color: #FF6600; color: white; padding: 15px 30px; 
           text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
          🛒 Jetzt bei Mindfactory kaufen
        </a>
        <p><small>Oder kopiere diesen Link: {url}</small></p>
      </body>
    </html>
    """
    
    msg.attach(MIMEText(html, 'html'))
    
    # SMTP senden (Beispiel)
    # server = smtplib.SMTP('smtp.gmail.com', 587)
    # server.starttls()
    # server.login('your@email.com', 'password')
    # server.send_message(msg)
    # server.quit()
    
    print(f"E-Mail würde gesendet: {url}")

# Verwendung
pc_config = {
    '1234567': 1,
    '9876543': 2,
}

send_mindfactory_email(
    'kunde@example.com',
    pc_config,
    'Deine Gaming-PC Konfiguration'
)
```

---

## 8. 🎲 Zufällige PC-Konfigurations-Generator

### Szenario
Generiere zufällige PC-Builds für Testing oder Fun.

```python
import random

def generate_random_pc_build(budget_category='mid'):
    components = {
        'cpu': ['1234567', '1234568', '1234569'],
        'mainboard': ['9876543', '9876544', '9876545'],
        'ram': ['1357924', '1357925', '1357926'],
        'gpu': ['4567890', '4567891', '4567892'],
        'ssd': ['7890123', '7890124', '7890125'],
    }
    
    build = []
    for component_type, options in components.items():
        article_id = random.choice(options)
        quantity = 2 if component_type == 'ram' else 1
        build.append(f"{article_id}:{quantity}" if quantity > 1 else article_id)
    
    articles_param = ','.join(build)
    url = f"https://www.mindfactory.de/?articles={articles_param}&autostart=1"
    
    return {
        'build': build,
        'url': url
    }

# Verwenden
random_build = generate_random_pc_build()
print(f"Zufälliger Build: {random_build['url']}")
```

---

## 💡 Weitere Ideen

- **Inventory Management**: Automatische Nachbestellung bei niedrigem Lagerbestand
- **Batch-Bestellungen**: Mehrere Kunden-Bestellungen auf einmal
- **Test-Konfigurationen**: Schnelles Setup von Test-Systemen
- **Schulungs-PCs**: Bestellung identischer Konfigurationen für Schulen/Firmen
- **Reparatur-Service**: Schnelle Ersatzteil-Bestellung

---

## 🔗 Zusammenfassung

Das Mindfactory Bulk Cart Script eignet sich perfekt für:
- ✅ E-Commerce-Integration
- ✅ Automatisierung
- ✅ Wiederkehrende Bestellungen
- ✅ API-Services
- ✅ Bot-Integration
- ✅ Preisvergleichs-Seiten
