// ========================================
// Collaborative Mode Functions (IMP-001)
// ========================================

function showModeSelection() {
    elements.gameBoard.innerHTML = `
        <div class="start-screen">
            <div class="game-logo">🔄</div>
            <h1>Human-in-the-Loop</h1>
            <p class="tagline">Trust, But Verify</p>
            <div class="mode-selection" style="margin: var(--space-2xl) 0;">
                <h3 style="margin-bottom: var(--space-lg);">Select Game Mode</h3>
                <div class="mode-cards">
                    <button class="mode-card" onclick="startGameMode('solo')">
                        <span class="mode-icon">👤</span>
                        <h4>Solo Training</h4>
                        <p>Practice alone at your own pace</p>
                    </button>
                    <button class="mode-card" onclick="startGameMode('collaborative')">
                        <span class="mode-icon">👥</span>
                        <h4>Collaborative</h4>
                        <p>Two players compare decisions</p>
                    </button>
                </div>
            </div>
            <div class="start-info">
                <p>Learn when to trust AI and when to override it.</p>
                <p>Unlock ${Object.keys(CONCEPTS).length} concepts to build your AI Literacy Handbook.</p>
            </div>
        </div>
    `;
}

function startGameMode(mode) {
    if (mode === 'collaborative') {
        state.multiplayer.enabled = true;
        state.multiplayer.phase = 'playing';
        showPlayerNameInput();
    } else {
        state.multiplayer.enabled = false;
        showDifficultySelection();
    }
}

function showPlayerNameInput() {
    elements.gameBoard.innerHTML = `
        <div class="start-screen">
            <div class="game-logo">👥</div>
            <h1>Collaborative Mode</h1>
            <p class="tagline">Learn Together</p>
            <div class="player-setup" style="margin: var(--space-2xl) 0; max-width: 400px; width: 100%; margin-left: auto; margin-right: auto;">
                <div class="player-input" style="margin-bottom: var(--space-lg);">
                    <label style="display: block; text-align: left; margin-bottom: var(--space-sm); color: var(--color-text-secondary);">Player 1 Name</label>
                    <input type="text" id="player1-name" value="Player 1" style="width: 100%; padding: var(--space-md); border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); font-size: 16px; box-sizing: border-box;">
                </div>
                <div class="player-input" style="margin-bottom: var(--space-xl);">
                    <label style="display: block; text-align: left; margin-bottom: var(--space-sm); color: var(--color-text-secondary);">Player 2 Name</label>
                    <input type="text" id="player2-name" value="Player 2" style="width: 100%; padding: var(--space-md); border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); font-size: 16px; box-sizing: border-box;">
                </div>
                <button class="btn btn-primary" onclick="startCollaborativeGame()" style="width: 100%; padding: var(--space-lg); font-size: 18px;">
                    Start Collaborative Game
                </button>
            </div>
        </div>
    `;
}

function startCollaborativeGame() {
    const p1Name = document.getElementById('player1-name').value || 'Player 1';
    const p2Name = document.getElementById('player2-name').value || 'Player 2';
    
    state.multiplayer.players[0].name = p1Name;
    state.multiplayer.players[1].name = p2Name;
    state.multiplayer.currentPlayer = 1;
    
    // Reset game state
    state.currentScenarioIndex = 0;
    state.score = 0;
    state.investigationTokens = 6;
    state.trustLevel = 50;
    state.decisions = [];
    state.correctDecisions = 0;
    state.conceptsUnlocked = [];
    state.gameComplete = false;
    state.currentInvestigations = [];
    state.hasDecided = false;
    state.adaptiveDifficulty = {
        currentLevel: 'normal',
        recentAccuracy: [],
        scenariosAtCurrentLevel: 0
    };
    
    // Initialize scenario randomization
    const allIndices = Array.from({length: SCENARIOS.length}, (_, i) => i);
    state.scenarioOrder = shuffleArray(allIndices).slice(0, 10);
    state.scenariosPlayed = new Set();
    
    renderCollaborativeScenario();
}

function makeCollaborativeDecision(decision) {
    if (state.hasDecided) return;
    state.hasDecided = true;
    
    // Stop timer if running (IMP-002)
    stopTimer();
    
    const scenarioIndex = state.scenarioOrder[state.currentScenarioIndex];
    const scenario = SCENARIOS[scenarioIndex];
    const correctDecision = scenario.correctAction;
    const isCorrect = decision === correctDecision;
    
    // Calculate score
    let points = 0;
    if (isCorrect) {
        points = scenario.stakes * 100;
    }
    
    // Update current player's data
    const currentPlayer = state.multiplayer.players[state.multiplayer.currentPlayer - 1];
    currentPlayer.score += points;
    currentPlayer.decisions.push({
        scenario: scenario.id,
        decision: decision,
        correct: isCorrect,
        aiWasCorrect: scenario.aiIsCorrect
    });
    
    // Check if other player has decided
    const otherPlayer = state.multiplayer.players[state.multiplayer.currentPlayer === 1 ? 1 : 0];
    
    if (otherPlayer.decisions.length > state.currentScenarioIndex) {
        // Both players have decided - show comparison
        state.multiplayer.phase = 'comparing';
        showDecisionComparison(scenario, decision, isCorrect);
    } else {
        // Switch to other player
        state.multiplayer.currentPlayer = state.multiplayer.currentPlayer === 1 ? 2 : 1;
        showPlayerSwitchModal(currentPlayer.name, state.multiplayer.players[state.multiplayer.currentPlayer - 1].name);
    }
}

function showPlayerSwitchModal(finishedPlayerName, nextPlayerName) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="text-align: center; max-width: 400px;">
            <div style="font-size: 64px; margin-bottom: var(--space-md);">🔄</div>
            <h2>Switch Players</h2>
            <p style="color: var(--color-text-secondary); margin: var(--space-lg) 0;">
                <strong>${finishedPlayerName}</strong> has made their decision.
            </p>
            <p style="font-size: 18px; margin: var(--space-lg) 0;">
                It's <strong style="color: var(--color-info);">${nextPlayerName}</strong>'s turn!
            </p>
            <button class="btn btn-primary" onclick="this.closest('.modal').remove(); renderCollaborativeScenario();" style="margin-top: var(--space-lg);">
                Continue
            </button>
        </div>
    `;
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            renderCollaborativeScenario();
        }
    });
    document.body.appendChild(modal);
}

function showDecisionComparison(scenario, lastDecision, lastIsCorrect) {
    const p1 = state.multiplayer.players[0];
    const p2 = state.multiplayer.players[1];
    const p1Decision = p1.decisions[state.currentScenarioIndex];
    const p2Decision = p2.decisions[state.currentScenarioIndex];
    
    const agreed = p1Decision.decision === p2Decision.decision;
    if (agreed) {
        state.multiplayer.agreementCount++;
    }
    
    // Determine consensus bonus
    const consensusBonus = agreed && p1Decision.correct && p2Decision.correct ? 50 : 0;
    if (consensusBonus > 0) {
        p1.score += consensusBonus;
        p2.score += consensusBonus;
    }
    
    const resultArea = document.getElementById('result-area');
    
    let consequenceText = '';
    if (scenario.consequences) {
        const key = `${lastDecision}${lastIsCorrect ? 'Correct' : 'Wrong'}`;
        consequenceText = scenario.consequences[key] || '';
    }
    
    const concept = CONCEPTS[scenario.conceptTaught];
    
    resultArea.innerHTML = `
        <div class="comparison-result" style="margin-top: var(--space-xl); animation: fadeIn 0.5s ease-out;">
            <div class="comparison-header" style="background: var(--color-surface-light); padding: var(--space-lg); border-radius: 12px; margin-bottom: var(--space-lg);">
                <h3 style="text-align: center; margin-bottom: var(--space-md);">Decision Comparison</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md);">
                    <div class="player-result" style="padding: var(--space-md); border-radius: 8px; text-align: center; ${p1Decision.correct ? 'background: rgba(16, 185, 129, 0.1); border: 1px solid var(--color-trust);' : 'background: rgba(239, 68, 68, 0.1); border: 1px solid var(--color-distrust);'}">
                        <div style="font-weight: 600;">${p1.name}</div>
                        <div style="font-size: 24px; margin: var(--space-sm) 0;">${p1Decision.decision === 'accept' ? '✅' : '🛑'}</div>
                        <div style="font-size: 14px;">${p1Decision.decision === 'accept' ? 'ACCEPT' : 'OVERRIDE'}</div>
                        <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: var(--space-xs);">${p1Decision.correct ? '✓ Correct' : '✗ Incorrect'}</div>
                    </div>
                    <div class="player-result" style="padding: var(--space-md); border-radius: 8px; text-align: center; ${p2Decision.correct ? 'background: rgba(16, 185, 129, 0.1); border: 1px solid var(--color-trust);' : 'background: rgba(239, 68, 68, 0.1); border: 1px solid var(--color-distrust);'}">
                        <div style="font-weight: 600;">${p2.name}</div>
                        <div style="font-size: 24px; margin: var(--space-sm) 0;">${p2Decision.decision === 'accept' ? '✅' : '🛑'}</div>
                        <div style="font-size: 14px;">${p2Decision.decision === 'accept' ? 'ACCEPT' : 'OVERRIDE'}</div>
                        <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: var(--space-xs);">${p2Decision.correct ? '✓ Correct' : '✗ Incorrect'}</div>
                    </div>
                </div>
                
                ${agreed ? `
                    <div class="consensus-badge" style="margin-top: var(--space-md); padding: var(--space-md); background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.1)); border: 1px solid var(--color-info); border-radius: 8px; text-align: center;">
                        <div style="font-size: 24px;">🤝</div>
                        <div style="font-weight: 600; color: var(--color-info);">Consensus Reached!</div>
                        ${consensusBonus > 0 ? `<div style="font-size: 14px; color: var(--color-text-secondary);">Both correct! +${consensusBonus} bonus points each</div>` : '<div style="font-size: 14px; color: var(--color-text-secondary);">You agreed, but the decision was incorrect</div>'}
                    </div>
                ` : `
                    <div class="divergence-notice" style="margin-top: var(--space-md); padding: var(--space-md); background: rgba(245, 158, 11, 0.1); border: 1px solid var(--color-warning); border-radius: 8px; text-align: center;">
                        <div style="font-size: 24px;">⚡</div>
                        <div style="font-weight: 600; color: var(--color-warning);">Different Decisions</div>
                        <div style="font-size: 14px; color: var(--color-text-secondary);">Discuss: Why did you choose differently?</div>
                    </div>
                `}
            </div>
            
            ${consequenceText ? `
                <div class="consequence-visualization ${lastIsCorrect ? 'positive' : 'negative'}" style="margin-bottom: var(--space-lg);">
                    <h4>📖 What Happened Next</h4>
                    <p>${consequenceText}</p>
                </div>
            ` : ''}
            
            <div class="concept-unlocked">
                <h4>📚 Concept: ${concept.name}</h4>
                <p>${concept.definition}</p>
                <button class="btn btn-secondary" onclick="showConceptDetails('${scenario.conceptTaught}')">
                    Learn More
                </button>
            </div>
            
            <div class="discussion-prompt" style="margin-top: var(--space-lg); padding: var(--space-md); background: var(--color-surface-light); border-radius: 8px;">
                <h4 style="margin-bottom: var(--space-sm);">💬 Discussion Prompt</h4>
                <p style="color: var(--color-text-secondary); font-size: 14px;">
                    ${agreed ? 
                        'You both made the same choice. Discuss: What clues were most influential in your decision?' : 
                        'You made different choices. Discuss: What information led you to different conclusions?'
                    }
                </p>
            </div>
        </div>
    `;
    
    elements.nextBtn.disabled = false;
}

function nextCollaborativeScenario() {
    if (state.currentScenarioIndex < 9) {
        state.currentScenarioIndex++;
        state.multiplayer.currentPlayer = 1;
        state.multiplayer.phase = 'playing';
        renderCollaborativeScenario();
    } else {
        renderCollaborativeGameOver();
    }
}

function renderCollaborativeGameOver() {
    state.gameComplete = true;
    
    const p1 = state.multiplayer.players[0];
    const p2 = state.multiplayer.players[1];
    
    const p1Accuracy = (p1.decisions.filter(d => d.correct).length / p1.decisions.length) * 100;
    const p2Accuracy = (p2.decisions.filter(d => d.correct).length / p2.decisions.length) * 100;
    
    const winner = p1.score > p2.score ? p1 : p2.score > p1.score ? p2 : null;
    
    const conceptsHtml = state.conceptsUnlocked.map(id => {
        const concept = CONCEPTS[id];
        return `
            <div class="concept-mini-card" onclick="showConceptDetails('${id}')">
                <span class="mini-icon">${concept.icon}</span>
                <span class="mini-name">${concept.name}</span>
            </div>
        `;
    }).join('');
    
    elements.gameBoard.innerHTML = `
        <div class="game-over" style="text-align: center; max-width: 800px;">
            <div style="font-size: 64px; margin-bottom: var(--space-lg);">👥</div>
            <h1>Collaborative Training Complete!</h1>
            
            <div class="final-scores" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg); margin: var(--space-2xl) 0;">
                <div class="player-final-score ${winner === p1 ? 'winner' : ''}" style="padding: var(--space-xl); background: ${winner === p1 ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.1))' : 'var(--color-surface)'}; border-radius: 16px; border: 2px solid ${winner === p1 ? 'var(--color-info)' : 'var(--color-border)'};">
                    <div style="font-size: 14px; color: var(--color-text-secondary); margin-bottom: var(--space-sm);">${p1.name}</div>
                    <div style="font-size: 48px; font-weight: 800; color: var(--color-primary-light);">${p1.score}</div>
                    <div style="font-size: 14px; color: var(--color-text-secondary);">${p1Accuracy.toFixed(0)}% accuracy</div>
                    ${winner === p1 ? '<div style="margin-top: var(--space-sm); color: var(--color-info); font-weight: 600;">🏆 Winner!</div>' : ''}
                </div>
                <div class="player-final-score ${winner === p2 ? 'winner' : ''}" style="padding: var(--space-xl); background: ${winner === p2 ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.1))' : 'var(--color-surface)'}; border-radius: 16px; border: 2px solid ${winner === p2 ? 'var(--color-info)' : 'var(--color-border)'};">
                    <div style="font-size: 14px; color: var(--color-text-secondary); margin-bottom: var(--space-sm);">${p2.name}</div>
                    <div style="font-size: 48px; font-weight: 800; color: var(--color-primary-light);">${p2.score}</div>
                    <div style="font-size: 14px; color: var(--color-text-secondary);">${p2Accuracy.toFixed(0)}% accuracy</div>
                    ${winner === p2 ? '<div style="margin-top: var(--space-sm); color: var(--color-info); font-weight: 600;">🏆 Winner!</div>' : ''}
                </div>
            </div>
            
            ${winner === null ? '<div style="font-size: 24px; margin-bottom: var(--space-lg);">🤝 It\'s a tie!</div>' : ''}
            
            <div class="collaborative-stats" style="background: var(--color-surface); padding: var(--space-lg); border-radius: 12px; margin-bottom: var(--space-xl);">
                <h3 style="margin-bottom: var(--space-md);">Partnership Stats</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md);">
                    <div>
                        <div style="font-size: 28px; font-weight: 800; color: var(--color-primary-light);">${state.multiplayer.agreementCount}</div>
                        <div style="font-size: 12px; color: var(--color-text-secondary);">Times Agreed</div>
                    </div>
                    <div>
                        <div style="font-size: 28px; font-weight: 800; color: var(--color-primary-light);">${10 - state.multiplayer.agreementCount}</div>
                        <div style="font-size: 12px; color: var(--color-text-secondary);">Times Differed</div>
                    </div>
                    <div>
                        <div style="font-size: 28px; font-weight: 800; color: var(--color-primary-light);">${state.conceptsUnlocked.length}</div>
                        <div style="font-size: 12px; color: var(--color-text-secondary);">Concepts Learned</div>
                    </div>
                </div>
            </div>
            
            <div class="concepts-section">
                <h3>📚 Concepts Unlocked (${state.conceptsUnlocked.length}/${Object.keys(CONCEPTS).length})</h3>
                <div class="concepts-grid">
                    ${conceptsHtml}
                </div>
            </div>
            
            <button class="btn btn-primary" onclick="resetGame()" style="font-size: 16px; padding: 16px 32px; margin-top: var(--space-xl);">
                Train Again
            </button>
        </div>
    `;
    
    elements.nextBtn.disabled = true;
}


// Render collaborative scenario (called from both collaborative_mode.js and referenced in app.js)
function renderCollaborativeScenario() {
    const scenarioIndex = state.scenarioOrder[state.currentScenarioIndex];
    const scenario = SCENARIOS[scenarioIndex];
    const currentPlayer = state.multiplayer.players[state.multiplayer.currentPlayer - 1];
    const otherPlayer = state.multiplayer.players[state.multiplayer.currentPlayer === 1 ? 1 : 0];
    
    state.currentInvestigations = [];
    state.hasDecided = false;
    
    const difficulty = getDifficultyModifier();
    state.investigationTokens = difficulty.investigationTokens;
    
    elements.scenarioNum.textContent = state.currentScenarioIndex + 1;
    elements.score.textContent = state.score;
    updateTrustMeter();
    
    const difficultyDisplay = document.getElementById('difficulty-display');
    if (difficultyDisplay) {
        difficultyDisplay.querySelector('.difficulty-label').textContent = difficulty.label;
        difficultyDisplay.style.color = difficulty.color;
        difficultyDisplay.style.borderColor = difficulty.color;
    }
    
    const stakesHtml = Array(3).fill(0).map((_, i) => `
        <span class="stake-indicator ${i < scenario.stakes ? 'active' : ''}"></span>
    `).join('');
    
    const cluesHtml = scenario.investigationClues.map(clue => `
        <button class="clue-btn" 
                id="clue-${clue.id}"
                onclick="investigate('${clue.id}')"
                data-cost="${clue.cost}">
            Reveal (${clue.cost} token)
        </button>
    `).join('');
    
    elements.gameBoard.innerHTML = `
        <div class="collaborative-header" style="background: var(--color-surface); padding: var(--space-md); border-radius: 12px; margin-bottom: var(--space-lg); border: 2px solid var(--color-info);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <span style="font-size: 24px;">👥</span>
                    <span style="font-weight: 600;">Collaborative Mode</span>
                </div>
                <div style="color: var(--color-text-secondary);">
                    Scenario ${state.currentScenarioIndex + 1}/10
                </div>
            </div>
            <div style="display: flex; gap: var(--space-lg); margin-top: var(--space-md);">
                <div class="player-badge ${state.multiplayer.currentPlayer === 1 ? 'active' : ''}" style="flex: 1; padding: var(--space-md); background: ${state.multiplayer.currentPlayer === 1 ? 'rgba(139, 92, 246, 0.2)' : 'var(--color-surface-light)'}; border-radius: 8px; border: 2px solid ${state.multiplayer.currentPlayer === 1 ? 'var(--color-info)' : 'transparent'};">
                    <div style="font-weight: 600;">${state.multiplayer.players[0].name}</div>
                    <div style="font-size: 14px; color: var(--color-text-secondary);">Score: ${state.multiplayer.players[0].score}</div>
                </div>
                <div class="player-badge ${state.multiplayer.currentPlayer === 2 ? 'active' : ''}" style="flex: 1; padding: var(--space-md); background: ${state.multiplayer.currentPlayer === 2 ? 'rgba(139, 92, 246, 0.2)' : 'var(--color-surface-light)'}; border-radius: 8px; border: 2px solid ${state.multiplayer.currentPlayer === 2 ? 'var(--color-info)' : 'transparent'};">
                    <div style="font-weight: 600;">${state.multiplayer.players[1].name}</div>
                    <div style="font-size: 14px; color: var(--color-text-secondary);">Score: ${state.multiplayer.players[1].score}</div>
                </div>
            </div>
            <div style="margin-top: var(--space-md); text-align: center; color: var(--color-info); font-weight: 600;">
                🎮 Current Turn: ${currentPlayer.name}
            </div>
        </div>
        
        <div class="card scenario-card">
            <div class="scenario-header">
                <span class="scenario-category">${scenario.category}</span>
                <div class="scenario-stakes" title="Risk Level: ${scenario.stakes === 3 ? 'High' : scenario.stakes === 2 ? 'Medium' : 'Low'}">
                    ${stakesHtml}
                </div>
            </div>
            
            <h2 class="scenario-title">${scenario.title}</h2>
            <p class="scenario-description">${scenario.description}</p>
            
            <div class="ai-recommendation">
                <span class="ai-badge">AI System</span>
                ${difficulty.showConfidenceGap ? `<span class="ai-confidence">${scenario.aiConfidence}% Confidence</span>` : '<span class="ai-confidence">Confidence: Hidden (Expert Mode)</span>'}
                <p class="recommendation-text">${scenario.aiRecommendation}</p>
                <p class="recommendation-reasoning">${scenario.aiReasoning}</p>
            </div>
            
            <div class="investigation-section">
                <div class="investigation-header">
                    <h3>🔍 Investigation</h3>
                    <span class="tokens-remaining">Tokens: ${state.investigationTokens}</span>
                </div>
                <p class="investigation-hint">Spend tokens to investigate the AI system or the specific case details.</p>
                
                <div class="investigation-category">
                    <h4>🤖 AI System</h4>
                    <div class="clues-container">
                        <button class="clue-btn" id="ai-metrics-btn" onclick="investigateAI('metrics')">
                            Check AI calibration (1 token)
                        </button>
                        <button class="clue-btn" id="ai-trackrecord-btn" onclick="investigateAI('trackrecord')">
                            Check AI track record (1 token)
                        </button>
                    </div>
                </div>
                
                <div class="investigation-category">
                    <h4>📋 Case Details</h4>
                    <div class="clues-container" id="clues-container">
                        ${cluesHtml}
                    </div>
                </div>
            </div>
            
            <div class="decision-area">
                <button class="decision-btn accept" onclick="makeCollaborativeDecision('accept')">
                    <span class="btn-icon-large">✅</span>
                    <span>ACCEPT AI</span>
                    <span style="font-size: 12px; opacity: 0.7;">Trust the recommendation</span>
                </button>
                <button class="decision-btn override" onclick="makeCollaborativeDecision('override')">
                    <span class="btn-icon-large">🛑</span>
                    <span>OVERRIDE AI</span>
                    <span style="font-size: 12px; opacity: 0.7;">Use human judgment</span>
                </button>
            </div>
            
            <div id="result-area"></div>
        </div>
        
        ${otherPlayer.decisions.length > state.currentScenarioIndex ? `
            <div class="other-player-decision" style="margin-top: var(--space-lg); padding: var(--space-md); background: var(--color-surface-light); border-radius: 8px; text-align: center;">
                <span style="color: var(--color-text-secondary);">${otherPlayer.name} chose to 
                    <strong style="color: ${otherPlayer.decisions[state.currentScenarioIndex].decision === 'accept' ? 'var(--color-trust)' : 'var(--color-distrust)'};">
                        ${otherPlayer.decisions[state.currentScenarioIndex].decision === 'accept' ? 'ACCEPT' : 'OVERRIDE'}
                    </strong>
                </span>
            </div>
        ` : ''}
    `;
    
    elements.nextBtn.disabled = true;
}

// Difficulty Selection for Solo Mode (IMP-002)
function showDifficultySelection() {
    elements.gameBoard.innerHTML = `
        <div class="start-screen">
            <div class="game-logo">👤</div>
            <h1>Solo Training</h1>
            <p class="tagline">Choose Your Challenge</p>
            <div class="mode-selection" style="margin: var(--space-2xl) 0;">
                <h3 style="margin-bottom: var(--space-lg);">Select Difficulty</h3>
                <div class="mode-cards mode-cards-3">
                    <button class="mode-card" onclick="startSoloGame('easy')">
                        <span class="mode-icon">🌱</span>
                        <h4 style="color: #10B981;">Beginner</h4>
                        <p>6 tokens, clear hints, learn at your pace</p>
                    </button>
                    <button class="mode-card" onclick="startSoloGame('normal')" style="border-color: var(--color-primary);">
                        <span class="mode-icon">⚡</span>
                        <h4 style="color: #0EA5E9;">Standard</h4>
                        <p>4 tokens, balanced challenge</p>
                    </button>
                    <button class="mode-card" onclick="startSoloGame('hard')">
                        <span class="mode-icon">🔥</span>
                        <h4 style="color: #EF4444;">Expert</h4>
                        <p>3 tokens, no confidence scores, time pressure</p>
                    </button>
                </div>
            </div>
            <div class="start-info">
                <p>Expert mode recommended after completing Standard.</p>
            </div>
            <button class="btn btn-secondary" onclick="showModeSelection()" style="margin-top: var(--space-lg);">
                ← Back
            </button>
        </div>
    `;
}

function startSoloGame(difficulty) {
    state.adaptiveDifficulty.currentLevel = difficulty;
    
    // Set time limit for Expert mode (IMP-002)
    if (difficulty === 'hard') {
        state.timeLimit = 30; // 30 seconds per scenario
        state.timerEnabled = true;
    } else {
        state.timeLimit = null;
        state.timerEnabled = false;
    }
    
    startGame();
}
