# 🚀 Schnellstart

## In 3 Schritten zum Bulk-Import

### ⚡ Methode 1: URL-Parameter (Schnellste)

**Einfach diesen Link öffnen:**

```
https://www.mindfactory.de/?articles=1234567,9876543:2,1357924:5&autostart=1
```

Ersetze die Artikelnummern mit deinen eigenen!

### 📝 Methode 2: Mit Tampermonkey Script

#### Schritt 1: Tampermonkey installieren
- [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) | [Firefox](https://addons.mozilla.org/de/firefox/addon/tampermonkey/) | [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

#### Schritt 2: Script installieren
1. Tampermonkey → "Neues Script erstellen"
2. `mindfactory-cart-bulk-add.user.js` Inhalt kopieren & einfügen
3. Speichern (Strg+S)

#### Schritt 3: Nutzen!
1. Gehe zu [mindfactory.de](https://www.mindfactory.de)
2. Button **"📦 Bulk-Artikel hinzufügen"** unten rechts
3. Artikelnummern eingeben oder URL verwenden

## 🎯 Format

| Eingabe | Ergebnis |
|---------|----------|
| `1234567` | 1x Artikel |
| `1234567:2` | 2x Artikel |
| `1234567,9876543` | 2 verschiedene Artikel |
| `1234567:2,9876543:5` | 2x erster + 5x zweiter |

## 📋 Beispiele

### Gaming PC Build
```
https://www.mindfactory.de/?articles=CPU_ID,MB_ID,RAM_ID:2,GPU_ID,SSD_ID&autostart=1
```

### Server Upgrade
```
https://www.mindfactory.de/?articles=RAM_ID:4,SSD_ID:2
```

### Einzelteile
```
https://www.mindfactory.de/?articles=1234567,9876543,1357924
```

## 🔧 HTML Generator

Öffne `beispiel.html` im Browser für einen grafischen URL-Generator!

## 💡 Tipps

- **Bookmarks**: Speichere häufige Konfigurationen als Lesezeichen
- **Excel/CSV**: Erstelle Listen in Excel und generiere URLs automatisch
- **QR-Codes**: Generiere QR-Codes für Smartphone-Shopping
- **Autostart**: Füge `&autostart=1` für automatisches Hinzufügen hinzu

## ❓ Probleme?

1. ✅ Tampermonkey aktiv?
2. ✅ Artikelnummern korrekt?
3. ✅ Seite neu laden (F5)
4. ✅ Browser-Konsole prüfen (F12)

## 📖 Mehr Infos

Siehe `README.md` für vollständige Dokumentation!
