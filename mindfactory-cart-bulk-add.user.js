// ==UserScript==
// @name         Mindfactory Bulk Cart Add
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Fügt mehrere Artikel per Artikelnummer gleichzeitig in den Mindfactory-Warenkorb
// @author       You
// @match        https://www.mindfactory.de/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Konfiguration
    const CONFIG = {
        buttonText: '📦 Bulk-Artikel hinzufügen',
        modalTitle: 'Artikel in Warenkorb legen',
        addDelay: 1000, // Verzögerung zwischen Artikeln in ms
    };

    // CSS Styles für das Modal
    const styles = `
        .mf-bulk-modal {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        .mf-bulk-modal-content {
            background-color: #fefefe;
            margin: 5% auto;
            padding: 30px;
            border: 1px solid #888;
            border-radius: 8px;
            width: 90%;
            max-width: 600px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .mf-bulk-close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            line-height: 20px;
        }
        .mf-bulk-close:hover,
        .mf-bulk-close:focus {
            color: #000;
        }
        .mf-bulk-textarea {
            width: 100%;
            min-height: 200px;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 4px;
            font-family: monospace;
            font-size: 14px;
            margin: 15px 0;
            resize: vertical;
        }
        .mf-bulk-button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            margin-right: 10px;
        }
        .mf-bulk-button:hover {
            background-color: #45a049;
        }
        .mf-bulk-button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
        .mf-bulk-trigger-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #ff6600;
            color: white;
            padding: 15px 20px;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            z-index: 9999;
            transition: all 0.3s;
        }
        .mf-bulk-trigger-btn:hover {
            background-color: #e55a00;
            transform: scale(1.05);
        }
        .mf-bulk-progress {
            margin-top: 15px;
            padding: 10px;
            background-color: #f0f0f0;
            border-radius: 4px;
            display: none;
        }
        .mf-bulk-progress-bar {
            width: 100%;
            height: 20px;
            background-color: #ddd;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        .mf-bulk-progress-fill {
            height: 100%;
            background-color: #4CAF50;
            width: 0%;
            transition: width 0.3s;
        }
        .mf-bulk-log {
            max-height: 150px;
            overflow-y: auto;
            font-family: monospace;
            font-size: 12px;
            background-color: white;
            padding: 10px;
            border-radius: 4px;
        }
        .mf-bulk-log-item {
            padding: 2px 0;
        }
        .mf-bulk-log-success {
            color: #4CAF50;
        }
        .mf-bulk-log-error {
            color: #f44336;
        }
        .mf-bulk-help {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
            line-height: 1.5;
        }
    `;

    // Füge Styles hinzu
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Erstelle Modal HTML
    const modalHTML = `
        <div id="mfBulkModal" class="mf-bulk-modal">
            <div class="mf-bulk-modal-content">
                <span class="mf-bulk-close">&times;</span>
                <h2>${CONFIG.modalTitle}</h2>
                <div class="mf-bulk-help">
                    Gib die Artikelnummern ein (eine pro Zeile).<br>
                    Format: <code>Artikelnummer</code> oder <code>Artikelnummer:Menge</code><br>
                    Beispiel: <code>1234567</code> oder <code>1234567:2</code>
                </div>
                <textarea id="mfBulkInput" class="mf-bulk-textarea" placeholder="Beispiel:&#10;1234567&#10;9876543:2&#10;1357924:5"></textarea>
                <div>
                    <button id="mfBulkStart" class="mf-bulk-button">Artikel hinzufügen</button>
                    <button id="mfBulkClear" class="mf-bulk-button" style="background-color: #f44336;">Liste löschen</button>
                </div>
                <div id="mfBulkProgress" class="mf-bulk-progress">
                    <div class="mf-bulk-progress-bar">
                        <div id="mfBulkProgressFill" class="mf-bulk-progress-fill"></div>
                    </div>
                    <div id="mfBulkLog" class="mf-bulk-log"></div>
                </div>
            </div>
        </div>
    `;

    // Erstelle Trigger Button
    const triggerButton = document.createElement('button');
    triggerButton.className = 'mf-bulk-trigger-btn';
    triggerButton.textContent = CONFIG.buttonText;
    triggerButton.id = 'mfBulkTriggerBtn';

    // Füge alles zum DOM hinzu
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.appendChild(triggerButton);

    // DOM Elemente
    const modal = document.getElementById('mfBulkModal');
    const closeBtn = modal.querySelector('.mf-bulk-close');
    const startBtn = document.getElementById('mfBulkStart');
    const clearBtn = document.getElementById('mfBulkClear');
    const input = document.getElementById('mfBulkInput');
    const progress = document.getElementById('mfBulkProgress');
    const progressFill = document.getElementById('mfBulkProgressFill');
    const log = document.getElementById('mfBulkLog');

    // Event Listeners
    triggerButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        log.innerHTML = '';
        progress.style.display = 'none';
        progressFill.style.width = '0%';
    });

    startBtn.addEventListener('click', async () => {
        await processArticles();
    });

    // Artikel verarbeiten
    async function processArticles() {
        const text = input.value.trim();
        if (!text) {
            alert('Bitte gib mindestens eine Artikelnummer ein.');
            return;
        }

        const lines = text.split('\n').filter(line => line.trim());
        const articles = [];

        // Parse die Eingabe
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            let articleNumber, quantity = 1;
            
            if (trimmed.includes(':')) {
                const parts = trimmed.split(':');
                articleNumber = parts[0].trim();
                quantity = parseInt(parts[1].trim()) || 1;
            } else {
                articleNumber = trimmed;
            }

            articles.push({ articleNumber, quantity });
        }

        if (articles.length === 0) {
            alert('Keine gültigen Artikelnummern gefunden.');
            return;
        }

        // Zeige Progress
        progress.style.display = 'block';
        log.innerHTML = '';
        startBtn.disabled = true;

        let successCount = 0;
        let errorCount = 0;

        // Verarbeite jeden Artikel
        for (let i = 0; i < articles.length; i++) {
            const { articleNumber, quantity } = articles[i];
            const percent = ((i + 1) / articles.length) * 100;
            progressFill.style.width = percent + '%';

            try {
                const success = await addToCart(articleNumber, quantity);
                if (success) {
                    successCount++;
                    addLogEntry(`✓ Artikel ${articleNumber} (${quantity}x) hinzugefügt`, 'success');
                } else {
                    errorCount++;
                    addLogEntry(`✗ Artikel ${articleNumber} konnte nicht hinzugefügt werden`, 'error');
                }
            } catch (error) {
                errorCount++;
                addLogEntry(`✗ Fehler bei Artikel ${articleNumber}: ${error.message}`, 'error');
            }

            // Warte zwischen Requests
            if (i < articles.length - 1) {
                await sleep(CONFIG.addDelay);
            }
        }

        // Zeige Zusammenfassung
        addLogEntry(`\n=== Fertig: ${successCount} erfolgreich, ${errorCount} fehlgeschlagen ===`, 'success');
        startBtn.disabled = false;

        // Aktualisiere Warenkorb-Anzeige
        setTimeout(() => {
            location.reload();
        }, 2000);
    }

    // Artikel zum Warenkorb hinzufügen
    async function addToCart(articleNumber, quantity) {
        // Methode 1: Versuche das Schnellbestellformular zu verwenden
        const quickOrderForm = document.querySelector('form[name="quickorder"]') || 
                               document.querySelector('form[action*="schnellbestellung"]') ||
                               document.querySelector('form[action*="quickorder"]');

        if (quickOrderForm) {
            const articleInput = quickOrderForm.querySelector('input[name*="artikel"]') ||
                                 quickOrderForm.querySelector('input[name*="pid"]') ||
                                 quickOrderForm.querySelector('input[type="text"]');
            const quantityInput = quickOrderForm.querySelector('input[name*="anzahl"]') ||
                                  quickOrderForm.querySelector('input[name*="menge"]') ||
                                  quickOrderForm.querySelector('input[name*="quantity"]');

            if (articleInput) {
                articleInput.value = articleNumber;
                if (quantityInput) {
                    quantityInput.value = quantity;
                }
                
                // Submit das Formular
                const submitBtn = quickOrderForm.querySelector('button[type="submit"]') ||
                                  quickOrderForm.querySelector('input[type="submit"]');
                if (submitBtn) {
                    submitBtn.click();
                    return true;
                }
            }
        }

        // Methode 2: Direkter API-Call (falls Formular nicht gefunden)
        try {
            const formData = new FormData();
            formData.append('artikel_id', articleNumber);
            formData.append('anzahl', quantity);
            
            const response = await fetch('/index.php/cat/index/addToBasket', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            return response.ok;
        } catch (error) {
            console.error('Fehler beim Hinzufügen:', error);
            return false;
        }
    }

    // Hilfsfunktionen
    function addLogEntry(message, type = '') {
        const entry = document.createElement('div');
        entry.className = `mf-bulk-log-item ${type ? 'mf-bulk-log-' + type : ''}`;
        entry.textContent = message;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    console.log('Mindfactory Bulk Cart Add Script geladen!');
})();
