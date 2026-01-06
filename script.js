// SAT Score Calculator - Main JavaScript

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
});

// SAT Score Conversion Tables (based on College Board official tables)
const readingConversionTable = {
    0: 10, 1: 10, 2: 10, 3: 11, 4: 12, 5: 13, 6: 14, 7: 15, 8: 15, 9: 16,
    10: 17, 11: 17, 12: 18, 13: 19, 14: 19, 15: 20, 16: 20, 17: 21, 18: 21, 19: 22,
    20: 22, 21: 23, 22: 23, 23: 24, 24: 24, 25: 25, 26: 25, 27: 26, 28: 26, 29: 27,
    30: 28, 31: 28, 32: 29, 33: 29, 34: 30, 35: 31, 36: 31, 37: 32, 38: 32, 39: 33,
    40: 33, 41: 34, 42: 35, 43: 35, 44: 36, 45: 37, 46: 37, 47: 38, 48: 38, 49: 39,
    50: 39, 51: 40, 52: 40
};

const writingConversionTable = {
    0: 10, 1: 10, 2: 10, 3: 11, 4: 12, 5: 13, 6: 13, 7: 14, 8: 15, 9: 16,
    10: 16, 11: 17, 12: 18, 13: 19, 14: 19, 15: 20, 16: 21, 17: 21, 18: 22, 19: 23,
    20: 23, 21: 24, 22: 25, 23: 25, 24: 26, 25: 26, 26: 27, 27: 28, 28: 28, 29: 29,
    30: 30, 31: 30, 32: 31, 33: 32, 34: 33, 35: 33, 36: 34, 37: 35, 38: 36, 39: 37,
    40: 38, 41: 38, 42: 39, 43: 39, 44: 40
};

const mathConversionTable = {
    0: 200, 1: 200, 2: 210, 3: 230, 4: 240, 5: 260, 6: 280, 7: 290, 8: 310, 9: 320,
    10: 330, 11: 340, 12: 360, 13: 370, 14: 380, 15: 390, 16: 410, 17: 420, 18: 430, 19: 440,
    20: 450, 21: 460, 22: 470, 23: 480, 24: 480, 25: 490, 26: 500, 27: 510, 28: 520, 29: 520,
    30: 530, 31: 540, 32: 550, 33: 560, 34: 560, 35: 570, 36: 580, 37: 590, 38: 600, 39: 600,
    40: 610, 41: 620, 42: 630, 43: 640, 44: 650, 45: 660, 46: 670, 47: 670, 48: 680, 49: 690,
    50: 700, 51: 710, 52: 730, 53: 740, 54: 750, 55: 760, 56: 780, 57: 790, 58: 800
};

// Calculate SAT Score
function calculateScore() {
    const readingCorrect = parseInt(document.getElementById('reading-correct').value) || 0;
    const writingCorrect = parseInt(document.getElementById('writing-correct').value) || 0;
    const mathNoCalc = parseInt(document.getElementById('math-no-calc').value) || 0;
    const mathCalc = parseInt(document.getElementById('math-calc').value) || 0;
    
    // Validate inputs
    if (readingCorrect < 0 || readingCorrect > 52 ||
        writingCorrect < 0 || writingCorrect > 44 ||
        mathNoCalc < 0 || mathNoCalc > 20 ||
        mathCalc < 0 || mathCalc > 38) {
        alert('Please enter valid numbers within the specified ranges.');
        return;
    }
    
    // Calculate test scores
    const readingScore = readingConversionTable[readingCorrect];
    const writingScore = writingConversionTable[writingCorrect];
    const mathRawScore = mathNoCalc + mathCalc;
    const mathScore = mathConversionTable[mathRawScore];
    
    // Calculate section scores
    const ebrwScore = (readingScore + writingScore) * 10;
    const totalScore = ebrwScore + mathScore;
    
    // Display results
    document.getElementById('total-score').textContent = totalScore;
    document.getElementById('ebrw-score').textContent = ebrwScore;
    document.getElementById('math-score').textContent = mathScore;
    document.getElementById('reading-score').textContent = readingScore;
    document.getElementById('writing-score').textContent = writingScore;
    document.getElementById('math-raw').textContent = mathRawScore + '/58';
    
    // Generate analysis
    generateAnalysis(totalScore, ebrwScore, mathScore, readingCorrect, writingCorrect, mathRawScore);
    
    // Show results
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Generate score analysis
function generateAnalysis(totalScore, ebrwScore, mathScore, readingCorrect, writingCorrect, mathRaw) {
    let analysis = '';
    let percentile = getPercentileFromScore(totalScore);
    
    // Overall performance
    analysis += `<p><strong>Overall Performance:</strong> Your total SAT score of ${totalScore} places you in the ${percentile}th percentile. `;
    
    if (totalScore >= 1500) {
        analysis += 'This is an excellent score that makes you highly competitive for top-tier universities including Ivy League schools.</p>';
    } else if (totalScore >= 1400) {
        analysis += 'This is a very strong score that makes you competitive for selective colleges and many top universities.</p>';
    } else if (totalScore >= 1300) {
        analysis += 'This is a good score that makes you competitive for many quality colleges and universities.</p>';
    } else if (totalScore >= 1200) {
        analysis += 'This is an above-average score. Consider retaking if targeting more selective schools.</p>';
    } else if (totalScore >= 1000) {
        analysis += 'This is an average score. With preparation, you have significant potential for improvement.</p>';
    } else {
        analysis += 'There is substantial room for improvement. Consider focused preparation and retaking the test.</p>';
    }
    
    // Section analysis
    analysis += '<p><strong>Section Analysis:</strong><br>';
    
    // EBRW Analysis
    if (ebrwScore >= 700) {
        analysis += `Your Evidence-Based Reading & Writing score (${ebrwScore}) is excellent. `;
    } else if (ebrwScore >= 600) {
        analysis += `Your Evidence-Based Reading & Writing score (${ebrwScore}) is strong. `;
    } else if (ebrwScore >= 500) {
        analysis += `Your Evidence-Based Reading & Writing score (${ebrwScore}) shows room for improvement. `;
    } else {
        analysis += `Your Evidence-Based Reading & Writing score (${ebrwScore}) needs significant improvement. `;
    }
    
    // Math Analysis
    if (mathScore >= 700) {
        analysis += `Your Math score (${mathScore}) is excellent.</p>`;
    } else if (mathScore >= 600) {
        analysis += `Your Math score (${mathScore}) is strong.</p>`;
    } else if (mathScore >= 500) {
        analysis += `Your Math score (${mathScore}) shows room for improvement.</p>`;
    } else {
        analysis += `Your Math score (${mathScore}) needs significant improvement.</p>`;
    }
    
    // Improvement suggestions
    analysis += '<p><strong>Improvement Suggestions:</strong><br>';
    const readingPct = (readingCorrect / 52) * 100;
    const writingPct = (writingCorrect / 44) * 100;
    const mathPct = (mathRaw / 58) * 100;
    
    if (readingPct < 70) {
        analysis += '• Focus on improving reading comprehension and passage analysis skills.<br>';
    }
    if (writingPct < 70) {
        analysis += '• Practice grammar rules and sentence structure concepts.<br>';
    }
    if (mathPct < 70) {
        analysis += '• Review fundamental math concepts in algebra, geometry, and data analysis.<br>';
    }
    
    if (readingPct >= 70 && writingPct >= 70 && mathPct >= 70) {
        analysis += '• Continue practicing with official College Board materials to maintain your strong performance.<br>';
        analysis += '• Focus on time management and test-taking strategies.<br>';
    }
    
    analysis += '• Take full-length practice tests under timed conditions.<br>';
    analysis += '• Review incorrect answers to understand your mistakes.</p>';
    
    document.getElementById('analysis-text').innerHTML = analysis;
}

// Calculate Superscore
function calculateSuperscore() {
    const ebrwScores = [];
    const mathScores = [];
    
    document.querySelectorAll('.test-entry').forEach(entry => {
        const ebrw = parseInt(entry.querySelector('.superscore-ebrw').value);
        const math = parseInt(entry.querySelector('.superscore-math').value);
        
        if (ebrw && ebrw >= 200 && ebrw <= 800) {
            ebrwScores.push(ebrw);
        }
        if (math && math >= 200 && math <= 800) {
            mathScores.push(math);
        }
    });
    
    if (ebrwScores.length === 0 || mathScores.length === 0) {
        alert('Please enter at least one complete test with both EBRW and Math scores.');
        return;
    }
    
    const bestEBRW = Math.max(...ebrwScores);
    const bestMath = Math.max(...mathScores);
    const superscore = bestEBRW + bestMath;
    
    // Display results
    document.getElementById('superscore-total').textContent = superscore;
    document.getElementById('superscore-ebrw').textContent = bestEBRW;
    document.getElementById('superscore-math-result').textContent = bestMath;
    
    // Generate breakdown
    let breakdown = '<h4>Score Breakdown</h4>';
    breakdown += '<div class="subscore-grid">';
    
    document.querySelectorAll('.test-entry').forEach((entry, index) => {
        const ebrw = parseInt(entry.querySelector('.superscore-ebrw').value);
        const math = parseInt(entry.querySelector('.superscore-math').value);
        
        if (ebrw || math) {
            breakdown += `<div class="subscore-item">`;
            breakdown += `<span>Test ${index + 1} Total</span>`;
            breakdown += `<span>${(ebrw || 0) + (math || 0)}</span>`;
            breakdown += `</div>`;
        }
    });
    
    breakdown += '</div>';
    breakdown += `<p style="margin-top: 1rem;">Your superscore of ${superscore} represents your best performance across all test attempts. `;
    
    const improvement = superscore - Math.max(...ebrwScores.map((e, i) => e + mathScores[i]));
    if (improvement > 0) {
        breakdown += `This is ${improvement} points higher than your best single test score!</p>`;
    } else {
        breakdown += `This matches your best single test score.</p>`;
    }
    
    document.getElementById('superscore-breakdown').innerHTML = breakdown;
    
    // Show results
    document.getElementById('superscore-results').classList.remove('hidden');
    document.getElementById('superscore-results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Percentile data (approximate based on College Board data)
function getPercentileFromScore(score) {
    const percentileMap = {
        1600: 99, 1590: 99, 1580: 99, 1570: 99, 1560: 99, 1550: 99, 1540: 99, 1530: 99, 1520: 99, 1510: 99,
        1500: 99, 1490: 98, 1480: 98, 1470: 98, 1460: 97, 1450: 97, 1440: 96, 1430: 96, 1420: 95, 1410: 95,
        1400: 94, 1390: 93, 1380: 93, 1370: 92, 1360: 91, 1350: 90, 1340: 89, 1330: 89, 1320: 88, 1310: 87,
        1300: 86, 1290: 85, 1280: 84, 1270: 83, 1260: 82, 1250: 81, 1240: 80, 1230: 79, 1220: 78, 1210: 77,
        1200: 74, 1190: 73, 1180: 72, 1170: 71, 1160: 69, 1150: 68, 1140: 67, 1130: 65, 1120: 64, 1110: 62,
        1100: 61, 1090: 59, 1080: 58, 1070: 56, 1060: 54, 1050: 53, 1040: 51, 1030: 49, 1020: 48, 1010: 46,
        1000: 44, 990: 42, 980: 40, 970: 38, 960: 37, 950: 35, 940: 33, 930: 31, 920: 29, 910: 27,
        900: 26, 890: 24, 880: 22, 870: 21, 860: 19, 850: 18, 840: 16, 830: 15, 820: 14, 810: 13,
        800: 12, 790: 11, 780: 10, 770: 9, 760: 8, 750: 7, 740: 6, 730: 6, 720: 5, 710: 5,
        700: 4, 690: 4, 680: 3, 670: 3, 660: 2, 650: 2, 640: 2, 630: 1, 620: 1, 610: 1,
        600: 1, 590: 1, 580: 1, 570: 1, 560: 1, 550: 1, 540: 1, 530: 1, 520: 1, 510: 1,
        500: 1, 490: 1, 480: 1, 470: 1, 460: 1, 450: 1, 440: 1, 430: 1, 420: 1, 410: 1, 400: 1
    };
    
    // Round to nearest 10
    const roundedScore = Math.round(score / 10) * 10;
    return percentileMap[roundedScore] || 50;
}

// Calculate Percentile
function calculatePercentile() {
    const score = parseInt(document.getElementById('percentile-score').value);
    
    if (!score || score < 400 || score > 1600) {
        alert('Please enter a valid SAT score between 400 and 1600.');
        return;
    }
    
    const percentile = getPercentileFromScore(score);
    
    document.getElementById('percentile-score-display').textContent = score;
    document.getElementById('percentile-rank').textContent = percentile + 'th';
    
    // Generate explanation
    let explanation = `<p>With a score of ${score}, you scored better than approximately ${percentile}% of all SAT test-takers. `;
    
    if (percentile >= 99) {
        explanation += 'You are in the top 1% of all test-takers! This is an exceptional achievement.</p>';
    } else if (percentile >= 90) {
        explanation += 'You are in the top 10% of all test-takers. This is an excellent score that will make you competitive at most selective colleges.</p>';
    } else if (percentile >= 75) {
        explanation += 'You are in the top 25% of all test-takers. This is a strong score that demonstrates solid academic preparation.</p>';
    } else if (percentile >= 50) {
        explanation += 'You scored above the national median. With focused preparation, you could improve your standing significantly.</p>';
    } else {
        explanation += 'You scored below the national median. Consider retaking the test after dedicated preparation to improve your percentile rank.</p>';
    }
    
    explanation += `<p><strong>What this means for college admissions:</strong><br>`;
    
    if (score >= 1450) {
        explanation += 'Most colleges, including highly selective institutions, will view your score very favorably. You meet or exceed the average SAT scores for top universities.</p>';
    } else if (score >= 1300) {
        explanation += 'You are competitive for a wide range of colleges, including many selective institutions. Research target schools\' average SAT ranges to assess your competitiveness.</p>';
    } else if (score >= 1100) {
        explanation += 'You are competitive for many colleges and universities. Focus on schools where your score is at or above the median for admitted students.</p>';
    } else {
        explanation += 'Consider retaking the SAT to expand your college options. Many quality colleges have holistic admissions and may still consider you if other parts of your application are strong.</p>';
    }
    
    document.getElementById('percentile-explanation').innerHTML = explanation;
    
    // Show results
    document.getElementById('percentile-results').classList.remove('hidden');
    document.getElementById('percentile-results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Draw simple chart representation
    drawPercentileChart(percentile);
}

// Simple visual representation of percentile
function drawPercentileChart(percentile) {
    const canvas = document.getElementById('percentileChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = 300;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, width, height);
    
    // Draw bell curve approximation
    ctx.beginPath();
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    
    for (let x = 0; x <= width; x++) {
        const normalizedX = (x / width - 0.5) * 6; // -3 to 3 standard deviations
        const y = height - (height * 0.8 * Math.exp(-(normalizedX * normalizedX) / 2) / Math.sqrt(2 * Math.PI) * 2.5);
        
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    
    // Draw percentile marker
    const markerX = (percentile / 100) * width;
    ctx.beginPath();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.moveTo(markerX, 0);
    ctx.lineTo(markerX, height);
    ctx.stroke();
    
    // Add label
    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${percentile}th Percentile`, markerX, 30);
    
    // Add axis labels
    ctx.fillStyle = '#374151';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('0%', 10, height - 10);
    ctx.textAlign = 'center';
    ctx.fillText('50%', width / 2, height - 10);
    ctx.textAlign = 'right';
    ctx.fillText('100%', width - 10, height - 10);
}

// College admission estimator
const collegeData = [
    // Reach schools (1450+)
    { name: 'Harvard University', avgSAT: 1520, tier: 'reach', minSAT: 1450 },
    { name: 'Stanford University', avgSAT: 1505, tier: 'reach', minSAT: 1440 },
    { name: 'MIT', avgSAT: 1535, tier: 'reach', minSAT: 1470 },
    { name: 'Yale University', avgSAT: 1515, tier: 'reach', minSAT: 1450 },
    { name: 'Princeton University', avgSAT: 1515, tier: 'reach', minSAT: 1450 },
    { name: 'Columbia University', avgSAT: 1510, tier: 'reach', minSAT: 1440 },
    { name: 'University of Chicago', avgSAT: 1520, tier: 'reach', minSAT: 1450 },
    { name: 'Caltech', avgSAT: 1545, tier: 'reach', minSAT: 1480 },
    
    // Target schools (1300-1450)
    { name: 'UC Berkeley', avgSAT: 1430, tier: 'target', minSAT: 1300 },
    { name: 'UCLA', avgSAT: 1405, tier: 'target', minSAT: 1280 },
    { name: 'University of Michigan', avgSAT: 1435, tier: 'target', minSAT: 1320 },
    { name: 'NYU', avgSAT: 1440, tier: 'target', minSAT: 1310 },
    { name: 'USC', avgSAT: 1435, tier: 'target', minSAT: 1320 },
    { name: 'Carnegie Mellon', avgSAT: 1480, tier: 'target', minSAT: 1380 },
    { name: 'Georgetown University', avgSAT: 1450, tier: 'target', minSAT: 1340 },
    { name: 'Boston College', avgSAT: 1420, tier: 'target', minSAT: 1320 },
    
    // Safety schools (1100-1300)
    { name: 'Penn State', avgSAT: 1265, tier: 'safety', minSAT: 1100 },
    { name: 'University of Wisconsin', avgSAT: 1355, tier: 'safety', minSAT: 1200 },
    { name: 'Ohio State University', avgSAT: 1330, tier: 'safety', minSAT: 1180 },
    { name: 'University of Florida', avgSAT: 1360, tier: 'safety', minSAT: 1240 },
    { name: 'University of Washington', avgSAT: 1340, tier: 'safety', minSAT: 1200 },
    { name: 'University of Texas Austin', avgSAT: 1355, tier: 'safety', minSAT: 1230 },
    { name: 'Rutgers University', avgSAT: 1305, tier: 'safety', minSAT: 1150 },
    { name: 'Indiana University', avgSAT: 1245, tier: 'safety', minSAT: 1080 }
];

function estimateCollegeChances() {
    const score = parseInt(document.getElementById('college-score').value);
    const gpa = parseFloat(document.getElementById('gpa').value) || 3.5;
    
    if (!score || score < 400 || score > 1600) {
        alert('Please enter a valid SAT score between 400 and 1600.');
        return;
    }
    
    // Categorize schools
    const safetySchools = [];
    const targetSchools = [];
    const reachSchools = [];
    
    collegeData.forEach(college => {
        const scoreDiff = score - college.avgSAT;
        let admissionChance = '';
        let tier = '';
        
        if (score >= college.avgSAT + 50) {
            admissionChance = 'High';
            tier = 'safety';
        } else if (score >= college.avgSAT - 30) {
            admissionChance = 'Moderate';
            tier = 'target';
        } else if (score >= college.minSAT) {
            admissionChance = 'Lower';
            tier = 'reach';
        } else {
            return; // Too low, don't include
        }
        
        // Adjust based on GPA
        let chanceClass = 'chance-medium';
        if (admissionChance === 'High') chanceClass = 'chance-high';
        if (admissionChance === 'Lower') chanceClass = 'chance-low';
        
        const collegeItem = {
            name: college.name,
            avgSAT: college.avgSAT,
            chance: admissionChance,
            chanceClass: chanceClass
        };
        
        if (tier === 'safety') {
            safetySchools.push(collegeItem);
        } else if (tier === 'target') {
            targetSchools.push(collegeItem);
        } else {
            reachSchools.push(collegeItem);
        }
    });
    
    // Display results
    displayCollegeList('safety-schools', safetySchools);
    displayCollegeList('target-schools', targetSchools);
    displayCollegeList('reach-schools', reachSchools);
    
    // Show results
    document.getElementById('college-results').classList.remove('hidden');
    document.getElementById('college-results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function displayCollegeList(elementId, schools) {
    const container = document.getElementById(elementId);
    
    if (schools.length === 0) {
        container.innerHTML = '<p style="color: #6b7280;">No schools in this category for your score range.</p>';
        return;
    }
    
    let html = '';
    schools.forEach(school => {
        html += `
            <div class="college-item">
                <div>
                    <div class="college-name">${school.name}</div>
                    <div class="college-stats">Avg SAT: ${school.avgSAT}</div>
                </div>
                <div>
                    <span class="admission-chance ${school.chanceClass}">${school.chance}</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Input validation
document.addEventListener('DOMContentLoaded', function() {
    // Add validation on blur (when user finishes typing)
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const min = parseFloat(this.min);
            const max = parseFloat(this.max);
            let value = parseFloat(this.value);
            
            // Only validate if a value exists
            if (this.value !== '' && !isNaN(value)) {
                if (value < min) {
                    this.value = min;
                } else if (value > max) {
                    this.value = max;
                }
            }
        });
        
        // Allow free typing without immediate validation
        input.addEventListener('input', function() {
            // Remove non-numeric characters except decimal point and minus
            this.value = this.value.replace(/[^\d.-]/g, '');
        });
    });
    
    // Allow Enter key to trigger calculations
    document.getElementById('percentile-score')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculatePercentile();
    });
    
    document.getElementById('college-score')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') estimateCollegeChances();
    });
});
