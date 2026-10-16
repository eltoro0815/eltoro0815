# 🚀 Schnellstart-Anleitung

## In 3 Schritten zum Bulk-Import

### Schritt 1: Tampermonkey installieren

Installiere die Tampermonkey-Browser-Erweiterung:
- [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Firefox](https://addons.mozilla.org/de/firefox/addon/tampermonkey/)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

### Schritt 2: Script installieren

1. Tampermonkey-Icon klicken → **"Neues Script erstellen"**
2. Kompletten Inhalt von `mindfactory-cart-bulk-add.user.js` kopieren
3. In Tampermonkey einfügen und speichern (Strg+S)

### Schritt 3: Nutzen!

1. Gehe zu [www.mindfactory.de](https://www.mindfactory.de)
2. Klicke auf den Button **"📦 Bulk-Artikel hinzufügen"** (unten rechts)
3. Gib deine Artikelnummern ein:
   ```
   1234567
   9876543:2
   1357924:5
   ```
4. Klicke **"Artikel hinzufügen"**
5. Fertig! ✅

## Eingabeformat

| Eingabe | Bedeutung |
|---------|-----------|
| `1234567` | 1x Artikel 1234567 |
| `1234567:2` | 2x Artikel 1234567 |
| `1234567:10` | 10x Artikel 1234567 |

## Wo finde ich Artikelnummern?

- In der **Produkt-URL**: `...product_info.php/products_id/1234567`
- Auf der **Produktseite**: "Artikel-Nr.: 1234567"
- In der **Bestellhistorie**

## Häufige Fragen

### Der Button erscheint nicht?
→ Seite neu laden (F5) und prüfen, ob Tampermonkey aktiv ist

### Artikel werden nicht hinzugefügt?
→ Artikelnummern überprüfen und ggf. Verzögerung erhöhen (im Script-Code)

### Kann ich das aus Excel kopieren?
→ Ja! Einfach die Spalte kopieren und einfügen

## Video-Tutorial

1. Installiere Tampermonkey
2. Öffne Tampermonkey → "Neues Script"
3. Kopiere & füge `mindfactory-cart-bulk-add.user.js` ein
4. Speichere mit Strg+S
5. Gehe zu mindfactory.de
6. Klicke auf den orangenen Button unten rechts
7. Gib Artikelnummern ein → "Artikel hinzufügen"

## Support

Bei Problemen:
1. ✅ Browser-Konsole öffnen (F12)
2. ✅ README_TAMPERMONKEY.md lesen
3. ✅ Script-Version überprüfen

**Viel Erfolg!** 🎉
