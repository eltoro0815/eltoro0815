# Mindfactory Bulk Cart Add - Tampermonkey Script

Ein Tampermonkey-Script, das mehrere Artikel per GET-Parameter oder manueller Eingabe in den Mindfactory-Warenkorb legt.

## 🚀 Features

- 📦 **Bulk-Import via URL**: Artikel direkt per GET-Parameter hinzufügen
- ✍️ **Manuelle Eingabe**: Alternativ über Textarea-Interface
- 🔢 **Mengenangabe**: Optional Menge pro Artikel
- 📊 **Fortschrittsanzeige**: Live-Status mit Erfolgs-/Fehlerprotokoll
- ⚡ **Auto-Start**: Optional automatisches Hinzufügen beim Laden

## Installation

### 1. Tampermonkey installieren

- **Chrome**: [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Firefox Add-ons](https://addons.mozilla.org/de/firefox/addon/tampermonkey/)
- **Edge**: [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

### 2. Script installieren

1. Tampermonkey-Icon → **"Neues Script erstellen"**
2. Inhalt von `mindfactory-cart-bulk-add.user.js` kopieren
3. Einfügen und speichern (Strg+S)

## Verwendung

### Methode 1: URL-Parameter (Empfohlen)

Füge den `articles` Parameter zur Mindfactory-URL hinzu:

```
https://www.mindfactory.de/?articles=ARTIKELNUMMER1,ARTIKELNUMMER2,ARTIKELNUMMER3
```

#### Beispiele

**Einfache Liste:**
```
https://www.mindfactory.de/?articles=1234567,9876543,1357924
```

**Mit Mengenangabe:**
```
https://www.mindfactory.de/?articles=1234567:2,9876543:5,1357924:1
```

**Mit Autostart:**
```
https://www.mindfactory.de/?articles=1234567,9876543&autostart=1
```
oder
```
https://www.mindfactory.de/?articles=1234567,9876543&auto=true
```

#### Format

| URL-Parameter | Beschreibung | Beispiel |
|---------------|--------------|----------|
| `articles=123` | Einzelner Artikel | `?articles=1234567` |
| `articles=123,456` | Mehrere Artikel | `?articles=1234567,9876543` |
| `articles=123:2` | Mit Menge | `?articles=1234567:2` |
| `articles=123:2,456:5` | Mehrere mit Menge | `?articles=1234567:2,9876543:5` |
| `&autostart=1` | Automatisch starten | `?articles=123&autostart=1` |
| `&auto=true` | Automatisch starten | `?articles=123&auto=true` |

### Methode 2: Manuelle Eingabe

1. Auf [mindfactory.de](https://www.mindfactory.de) gehen
2. Button **"📦 Bulk-Artikel hinzufügen"** (unten rechts) klicken
3. Artikelnummern eingeben (eine pro Zeile):
   ```
   1234567
   9876543:2
   1357924:5
   ```
4. **"Artikel hinzufügen"** klicken

## Format

### Eingabeformat

```
ARTIKELNUMMER              → 1x Artikel
ARTIKELNUMMER:MENGE        → n-mal Artikel
```

### Beispiele

```
1234567        → 1x Artikel 1234567
9876543:2      → 2x Artikel 9876543
1357924:5      → 5x Artikel 1357924
4567890        → 1x Artikel 4567890
```

## Use Cases

### 1. PC-Konfigurator Externe Tools

Erstelle einen eigenen PC-Konfigurator, der am Ende einen Mindfactory-Link generiert:

```javascript
function generateMindfactoryURL(articles) {
    const base = 'https://www.mindfactory.de/';
    const params = articles.map(a => `${a.id}:${a.quantity}`).join(',');
    return `${base}?articles=${params}&autostart=1`;
}

// Beispiel
const pcBuild = [
    { id: '1234567', quantity: 1 }, // CPU
    { id: '9876543', quantity: 1 }, // Mainboard
    { id: '1357924', quantity: 2 }, // RAM (2x16GB)
];

const url = generateMindfactoryURL(pcBuild);
// https://www.mindfactory.de/?articles=1234567:1,9876543:1,1357924:2&autostart=1
```

### 2. Excel/CSV Import

1. Artikelnummern in Excel-Spalte
2. Mit `=A1&":"&B1` Menge anhängen
3. Mit Komma verbinden: `=TEXTJOIN(",",TRUE,C:C)`
4. URL bauen: `="https://www.mindfactory.de/?articles="&D1`

### 3. Wiederkehrende Bestellungen

Speichere häufige Konfigurationen als Bookmarks:

```
Bookmark 1: "Gaming PC Base"
https://www.mindfactory.de/?articles=1234567,9876543:2,1357924

Bookmark 2: "Server Upgrade"
https://www.mindfactory.de/?articles=4567890:4,2468135:2&autostart=1
```

### 4. QR-Code für Einkaufslisten

Generiere QR-Codes mit der URL für einfaches Smartphone-Shopping:

```python
import qrcode

url = "https://www.mindfactory.de/?articles=1234567,9876543:2"
qr = qrcode.make(url)
qr.save("mindfactory_cart.png")
```

## Konfiguration

Im Script-Header:

```javascript
const CONFIG = {
    buttonText: '📦 Bulk-Artikel hinzufügen',
    modalTitle: 'Artikel in Warenkorb legen',
    addDelay: 1000,              // Verzögerung zwischen Artikeln (ms)
    getParamName: 'articles',    // Name des GET-Parameters
};
```

### Empfohlene Verzögerung

- **1000ms (Standard)**: Empfohlen für normale Nutzung
- **500ms**: Schneller, bei wenigen Artikeln
- **2000ms**: Langsamer, bei vielen Artikeln oder Problemen

## Funktionsweise

### URL-Parameter → Warenkorb

```
URL-Parameter auslesen
    ↓
Komma-separierte Liste parsen
    ↓
Pro Artikel: Menge extrahieren (Format: ID:Menge)
    ↓
Formular ausfüllen & absenden
    ↓
Verzögerung
    ↓
Nächster Artikel
    ↓
Seite neu laden
```

### Formular-Erkennung

Das Script nutzt mehrere Methoden:

1. **Schnellbestellformular**: Sucht nach `form[name="quickorder"]`
2. **Alternative Selektoren**: Verschiedene Formular-Attribute
3. **Fallback API-Call**: Direkter POST-Request

## Fehlerbehebung

### URL-Parameter funktionieren nicht

1. **Cache leeren**: Strg+F5 zum Hard-Refresh
2. **Script aktiv**: Tampermonkey-Icon prüfen
3. **URL korrekt**: Parameter-Format überprüfen
4. **Konsole**: F12 → Console für Fehler

### Artikel werden nicht hinzugefügt

1. **Artikelnummern**: Mindfactory-Nummern korrekt?
2. **Verzögerung erhöhen**: `addDelay` auf 2000+ setzen
3. **Formular prüfen**: Gibt es Änderungen auf Mindfactory?
4. **Browser-Konsole**: F12 für Details

### Autostart funktioniert nicht

```
# Beide Schreibweisen probieren:
?articles=123&autostart=1
?articles=123&auto=true
```

## Sicherheit & Datenschutz

- ✅ Läuft nur auf mindfactory.de
- ✅ Keine Datenübertragung an Dritte
- ✅ Nutzt native Mindfactory-Funktionen
- ✅ Open Source & überprüfbar

## Browser-Kompatibilität

- ✅ Chrome 120+
- ✅ Firefox 120+
- ✅ Edge 120+
- ⚠️ Safari (eingeschränkt)

## Tipps & Tricks

### URL-Encoding für spezielle Zeichen

Falls Probleme mit Sonderzeichen:
```javascript
const encoded = encodeURIComponent('1234567:2,9876543:5');
const url = `https://www.mindfactory.de/?articles=${encoded}`;
```

### Bookmarklet

Erstelle ein Bookmarklet zum schnellen Öffnen:

```javascript
javascript:(function(){window.location.href='https://www.mindfactory.de/?articles=1234567,9876543:2&autostart=1'})()
```

### Kombinieren mit anderen Parametern

```
https://www.mindfactory.de/category.php?categoryId=123&articles=1234567,9876543
```

## Beispiel-Integration

### HTML-Form zu Mindfactory

```html
<form action="https://www.mindfactory.de/" method="GET" target="_blank">
    <input type="text" name="articles" placeholder="1234567,9876543:2" />
    <button type="submit">Zum Warenkorb</button>
</form>
```

### JavaScript-Button

```html
<button onclick="goToMindfactory(['1234567', '9876543:2'])">
    Bei Mindfactory kaufen
</button>

<script>
function goToMindfactory(articles) {
    const url = `https://www.mindfactory.de/?articles=${articles.join(',')}&autostart=1`;
    window.open(url, '_blank');
}
</script>
```

## Version

**Version**: 2.0.0  
**Letzte Aktualisierung**: Oktober 2026

## Changelog

### v2.0.0
- ✨ GET-Parameter-Unterstützung (`?articles=...`)
- ✨ Autostart-Option (`&autostart=1`)
- ✨ URL-Info im Modal
- 🔧 Verbesserte Dokumentation

### v1.0.0
- 🎉 Erste Version mit manueller Eingabe

## Lizenz

Frei verwendbar für private und kommerzielle Zwecke.

## Haftungsausschluss

Dieses Script ist eine Hilfsfunktion ohne Gewährleistung. Nutzung auf eigene Verantwortung.
