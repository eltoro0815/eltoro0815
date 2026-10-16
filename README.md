# eltoro0815's Repository

## 📦 Mindfactory Bulk Cart Add

Ein Tampermonkey-Script, das mehrere Artikel per GET-Parameter oder manueller Eingabe in den Mindfactory-Warenkorb legt.

### ⚡ Quick Start

**Direkt per URL verwenden:**

```
https://www.mindfactory.de/?articles=1234567,9876543:2,1357924:5&autostart=1
```

Einfach die Artikelnummern ersetzen und öffnen!

### 📁 Projektverzeichnis

Alle Dateien befinden sich im Verzeichnis [`mindfactory-bulk-cart/`](./mindfactory-bulk-cart/)

### 📖 Dokumentation

- **[README.md](./mindfactory-bulk-cart/README.md)** - Vollständige Dokumentation
- **[SCHNELLSTART.md](./mindfactory-bulk-cart/SCHNELLSTART.md)** - Schnellstart-Anleitung
- **[USE_CASES.md](./mindfactory-bulk-cart/USE_CASES.md)** - Beispiele & Integrationen
- **[beispiel.html](./mindfactory-bulk-cart/beispiel.html)** - Interaktiver URL-Generator

### 🚀 Features

- ✅ **GET-Parameter**: Artikel direkt per URL hinzufügen
- ✅ **Bulk-Import**: Mehrere Artikel gleichzeitig
- ✅ **Mengenangabe**: Format `Artikelnummer:Menge`
- ✅ **Autostart**: Automatisches Hinzufügen beim Laden
- ✅ **UI**: Benutzerfreundliches Interface
- ✅ **API-Ready**: Integration in eigene Projekte

### 🎯 Verwendung

#### 1. Per URL (ohne Installation)

```
https://www.mindfactory.de/?articles=NUMMER1,NUMMER2:MENGE
```

#### 2. Mit Tampermonkey Script

1. Tampermonkey installieren ([Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) | [Firefox](https://addons.mozilla.org/de/firefox/addon/tampermonkey/) | [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd))
2. Script aus `mindfactory-bulk-cart/mindfactory-cart-bulk-add.user.js` kopieren
3. Bei mindfactory.de nutzen

### 💡 Beispiele

```
# Einzelner Artikel
?articles=1234567

# Mehrere Artikel
?articles=1234567,9876543,1357924

# Mit Mengenangabe
?articles=1234567:2,9876543:5

# Mit Autostart
?articles=1234567,9876543&autostart=1
```

### 🔧 Use Cases

- PC-Konfigurator Integration
- Excel/CSV Import
- Wiederkehrende Bestellungen
- QR-Code für Smartphone
- Discord/Slack Bot Integration
- API-Services
- E-Mail mit Einkaufsliste

Siehe [USE_CASES.md](./mindfactory-bulk-cart/USE_CASES.md) für detaillierte Beispiele!

---

Made with ❤️ for easier shopping
