# Mindfactory Bulk Cart Add - Tampermonkey Script

Ein Tampermonkey-Script, das es ermöglicht, mehrere Artikel per Artikelnummer gleichzeitig in den Mindfactory-Warenkorb zu legen.

## Features

- 📦 **Bulk-Import**: Mehrere Artikel gleichzeitig hinzufügen
- 🔢 **Mengenangabe**: Optional Menge pro Artikel festlegen
- 📊 **Fortschrittsanzeige**: Live-Status beim Hinzufügen
- 🎯 **Benutzerfreundlich**: Einfache Eingabe über Textarea
- ✅ **Validierung**: Erfolgs- und Fehlerprotokollierung

## Installation

### 1. Tampermonkey installieren

Falls noch nicht vorhanden, installiere Tampermonkey für deinen Browser:

- **Chrome**: [Tampermonkey im Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Tampermonkey für Firefox](https://addons.mozilla.org/de/firefox/addon/tampermonkey/)
- **Edge**: [Tampermonkey für Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- **Safari**: [Tampermonkey für Safari](https://apps.apple.com/app/tampermonkey/id1482490089)
- **Opera**: [Tampermonkey für Opera](https://addons.opera.com/de/extensions/details/tampermonkey-beta/)

### 2. Script installieren

1. Klicke auf das Tampermonkey-Icon in deinem Browser
2. Wähle **"Neues Script erstellen"**
3. Lösche den Beispielcode
4. Kopiere den kompletten Inhalt der Datei `mindfactory-cart-bulk-add.user.js`
5. Füge ihn in den Tampermonkey-Editor ein
6. Speichere das Script (Strg+S oder Cmd+S)

## Verwendung

### 1. Script aktivieren

1. Besuche [www.mindfactory.de](https://www.mindfactory.de)
2. Das Script wird automatisch geladen
3. Unten rechts erscheint ein Button: **"📦 Bulk-Artikel hinzufügen"**

### 2. Artikel hinzufügen

1. Klicke auf den **"📦 Bulk-Artikel hinzufügen"** Button
2. Gib die Artikelnummern ein (eine pro Zeile)
3. Klicke auf **"Artikel hinzufügen"**

### Eingabeformat

#### Einfache Artikelnummer (Menge = 1)
```
1234567
9876543
1357924
```

#### Mit Mengenangabe
```
1234567:2
9876543:5
1357924:1
```

#### Gemischt
```
1234567
9876543:3
1357924:10
4567890
```

### Beispiel

```
1234567        → 1x Artikel 1234567
9876543:2      → 2x Artikel 9876543
1357924:5      → 5x Artikel 1357924
```

## Funktionsweise

Das Script nutzt das vorhandene Schnellbestellformular auf der Mindfactory-Webseite:

1. **Formular-Erkennung**: Sucht nach dem Schnellbestellformular
2. **Eingabe-Automation**: Füllt Artikelnummer und Menge automatisch aus
3. **Submit**: Sendet das Formular für jeden Artikel
4. **Fallback**: Falls kein Formular gefunden wird, nutzt es einen direkten API-Call

### Ablauf

```
Eingabe → Parsing → Validation → Loop über Artikel → 
Formular ausfüllen → Submit → Verzögerung → Nächster Artikel
```

## Konfiguration

Im Script-Header kannst du folgende Einstellungen anpassen:

```javascript
const CONFIG = {
    buttonText: '📦 Bulk-Artikel hinzufügen',  // Button-Text
    modalTitle: 'Artikel in Warenkorb legen',   // Modal-Titel
    addDelay: 1000,                             // Verzögerung zwischen Artikeln (ms)
};
```

### Empfohlene Verzögerung

- **Standard**: 1000ms (1 Sekunde) - Empfohlen
- **Schneller**: 500ms - Bei wenigen Artikeln
- **Langsamer**: 2000ms - Bei vielen Artikeln oder bei Fehlern

⚠️ **Wichtig**: Zu kurze Verzögerungen können zu Fehlern oder Serverproblemen führen!

## Fehlerbehebung

### Button erscheint nicht

1. Überprüfe, ob Tampermonkey aktiv ist
2. Schaue in die Browser-Konsole (F12) nach Fehlermeldungen
3. Stelle sicher, dass du auf mindfactory.de bist
4. Lade die Seite neu (F5)

### Artikel werden nicht hinzugefügt

1. **Artikelnummer prüfen**: Stelle sicher, dass die Artikelnummern korrekt sind
2. **Formular nicht gefunden**: Das Script nutzt mehrere Methoden, manchmal muss die Seite neu geladen werden
3. **Verzögerung erhöhen**: Setze `addDelay` auf 2000 oder höher
4. **Browser-Konsole**: Öffne die Entwicklerkonsole (F12) für Details

### Seite lädt neu bevor alles fertig ist

Das ist beabsichtigt! Nach erfolgreicher Verarbeitung wird die Seite neu geladen, um den aktualisierten Warenkorb anzuzeigen.

## Sicherheit & Datenschutz

- ✅ Das Script läuft nur auf mindfactory.de
- ✅ Keine Daten werden an Dritte gesendet
- ✅ Nutzt nur die vorhandenen Mindfactory-Funktionen
- ✅ Open Source - Du kannst den Code selbst überprüfen

## Browser-Kompatibilität

Getestet mit:
- ✅ Chrome 120+
- ✅ Firefox 120+
- ✅ Edge 120+
- ⚠️ Safari (eingeschränkt getestet)

## Tipps & Tricks

### Artikelnummern finden

Mindfactory-Artikelnummern findest du:
1. In der Produkt-URL: `...product_info.php/products_id/1234567`
2. Auf der Produktseite unter "Artikel-Nr."
3. In der Bestellhistorie

### Bulk-Import aus Excel/CSV

1. Kopiere die Artikelnummern aus Excel
2. Füge sie direkt ins Textfeld ein
3. Das Script verarbeitet sie Zeile für Zeile

### Warenkorb vorab leeren

Für einen sauberen Import empfiehlt es sich:
1. Warenkorb vorher zu leeren
2. Dann alle Artikel auf einmal hinzuzufügen

## Lizenz

Dieses Script ist frei verwendbar für private und kommerzielle Zwecke.

## Support & Verbesserungen

Bei Problemen oder Verbesserungsvorschlägen:
1. Überprüfe die Fehlerbehebung oben
2. Schaue in die Browser-Konsole (F12)
3. Passe die Konfiguration an

## Version

**Version**: 1.0.0  
**Letzte Aktualisierung**: Oktober 2026

## Haftungsausschluss

Dieses Script ist eine Hilfsfunktion und wird ohne Gewährleistung bereitgestellt. Die Nutzung erfolgt auf eigene Verantwortung. Es nutzt ausschließlich die offiziellen Mindfactory-Funktionen.
