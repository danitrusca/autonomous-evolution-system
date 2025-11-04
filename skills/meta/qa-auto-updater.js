/**
 * Q&A Auto-Updater
 * Automatically updates DEVELOPER_QA.md based on patterns, lessons, and frequently asked questions
 */

const fs = require('fs');
const path = require('path');

class QAAutoUpdater {
  constructor() {
    this.qaPath = path.join(__dirname, '..', '..', 'docs', 'reference', 'DEVELOPER_QA.md');
    this.journalPath = path.join(__dirname, '..', '..', 'docs', 'living', 'EVOLUTION_JOURNAL.md');
    this.questionFrequency = new Map();
    this.qaEntries = new Map();
    this.loadExistingQA();
  }

  /**
   * Load existing Q&A entries for deduplication
   */
  loadExistingQA() {
    try {
      if (fs.existsSync(this.qaPath)) {
        const content = fs.readFileSync(this.qaPath, 'utf8');
        // Extract existing questions
        const questionMatches = content.match(/### Q: ([^\n]+)/g);
        if (questionMatches) {
          questionMatches.forEach(match => {
            const question = match.replace('### Q: ', '').trim();
            this.qaEntries.set(question.toLowerCase(), true);
          });
        }
        console.log(`[qa-auto-updater] Loaded ${this.qaEntries.size} existing Q&A entries`);
      }
    } catch (error) {
      console.error('[qa-auto-updater] Error loading existing Q&A:', error.message);
    }
  }

  /**
   * Detect questions from text
   */
  detectQuestions(text) {
    const questionPatterns = [
      /why\s+(?:is|are|do|does|did|can|cannot|can't|should|shouldn't|won't)/gi,
      /how\s+(?:do|does|did|can|cannot|can't|should|will|does.*work)/gi,
      /what\s+(?:is|are|do|does|did|can|cannot|can't|should|will)/gi,
      /should\s+(?:i|we|this|it|you)/gi,
      /when\s+(?:do|does|did|can|cannot|can't|should|will)/gi,
      /where\s+(?:do|does|did|can|cannot|can't|should|will)/gi,
      /\?/g  // Any text ending with question mark
    ];

    const questions = [];
    questionPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(match => {
          // Extract full question (find sentence containing question word)
          const sentences = text.split(/[.!?]/);
          sentences.forEach(sentence => {
            if (sentence.toLowerCase().includes(match.toLowerCase())) {
              const question = sentence.trim() + '?';
              if (question.length > 10 && question.length < 200) {
                questions.push(question);
              }
            }
          });
        });
      }
    });

    return [...new Set(questions)]; // Remove duplicates
  }

  /**
   * Extract answer from evolution journal for a question
   */
  extractAnswer(question, journalContent) {
    // Look for insights, lessons, or patterns that answer the question
    const answerPatterns = [
      /- \*\*Insight\*\*: ([^\n]+)/g,
      /- \*\*Learning\*\*: ([^\n]+)/g,
      /- \*\*Pattern\*\*: ([^\n]+)/g,
      /- \*\*Solution\*\*: ([^\n]+)/g,
      /- \*\*Root Cause\*\*: ([^\n]+)/g
    ];

    const answers = [];
    answerPatterns.forEach(pattern => {
      const matches = journalContent.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const answer = match.replace(/^- \*\*\w+\*\*: /, '').trim();
          if (answer.length > 20) {
            answers.push(answer);
          }
        });
      }
    });

    // Return most relevant answer (could be enhanced with semantic matching)
    return answers.length > 0 ? answers[0] : null;
  }

  /**
   * Generate Q&A entry
   */
  generateQAEntry(question, answer, source = null, confidence = '⭐⭐⭐') {
    const timestamp = new Date().toISOString().slice(0, 10);
    
    let entry = `### Q: ${question}\n\n`;
    entry += `**Confidence**: ${confidence} (${confidence === '⭐⭐⭐⭐⭐' ? 'High' : confidence === '⭐⭐⭐⭐' ? 'High' : 'Moderate'} - ${source || 'Based on patterns and lessons'})\n\n`;
    entry += `**A**: ${answer}\n\n`;
    
    if (source) {
      entry += `**Source**: ${source}\n\n`;
    }
    
    entry += `**Last Updated**: ${timestamp}\n\n`;
    entry += `---\n\n`;
    
    return entry;
  }

  /**
   * Determine Q&A section based on question
   */
  determineSection(question) {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('rule') || lowerQuestion.includes('skill') || lowerQuestion.includes('agent') || 
        lowerQuestion.includes('architecture') || lowerQuestion.includes('design')) {
      return 'Architecture & Design Decisions';
    }
    
    if (lowerQuestion.includes('evolution') || lowerQuestion.includes('learn') || lowerQuestion.includes('pattern')) {
      return 'Evolution & Learning';
    }
    
    if (lowerQuestion.includes('integration') || lowerQuestion.includes('coordinate') || lowerQuestion.includes('communicate')) {
      return 'Integration & Coordination';
    }
    
    if (lowerQuestion.includes('principle') || lowerQuestion.includes('decision') || lowerQuestion.includes('quality')) {
      return 'Principles & Decision Making';
    }
    
    if (lowerQuestion.includes('anti-pattern') || lowerQuestion.includes('mistake') || lowerQuestion.includes('avoid')) {
      return 'Anti-Patterns & Common Mistakes';
    }
    
    if (lowerQuestion.includes('test') || lowerQuestion.includes('debug') || lowerQuestion.includes('health')) {
      return 'Testing & Debugging';
    }
    
    if (lowerQuestion.includes('workflow') || lowerQuestion.includes('process') || lowerQuestion.includes('protocol')) {
      return 'Workflow & Processes';
    }
    
    return 'General Questions';
  }

  /**
   * Update Q&A file with new entry
   */
  async updateQAFile(question, answer, section, source = null, confidence = '⭐⭐⭐') {
    try {
      let content = fs.readFileSync(this.qaPath, 'utf8');
      
      // Generate new entry
      const newEntry = this.generateQAEntry(question, answer, source, confidence);
      
      // Find section in content
      const sectionHeader = `## ${section}`;
      const sectionIndex = content.indexOf(sectionHeader);
      
      if (sectionIndex === -1) {
        // Section doesn't exist, add it before "Integration with System Learning"
        const integrationIndex = content.indexOf('## 🔗 **Integration with System Learning**');
        if (integrationIndex !== -1) {
          const newSection = `## ${section}\n\n${newEntry}\n`;
          content = content.slice(0, integrationIndex) + newSection + content.slice(integrationIndex);
        } else {
          // Add at end before "Additional Resources"
          const resourcesIndex = content.indexOf('## 📚 **Additional Resources**');
          if (resourcesIndex !== -1) {
            const newSection = `## ${section}\n\n${newEntry}\n`;
            content = content.slice(0, resourcesIndex) + newSection + content.slice(resourcesIndex);
          } else {
            // Just append
            content += `\n\n## ${section}\n\n${newEntry}`;
          }
        }
      } else {
        // Section exists, add entry after section header
        const nextSectionIndex = content.indexOf('##', sectionIndex + 1);
        const insertIndex = nextSectionIndex === -1 ? content.length : nextSectionIndex;
        
        // Find where to insert (after section header, before next section)
        const sectionContent = content.slice(sectionIndex, insertIndex);
        const insertPoint = sectionContent.indexOf('---', sectionContent.indexOf('---') + 1); // After first Q&A entry
        
        if (insertPoint !== -1) {
          const actualInsertIndex = sectionIndex + insertPoint + 4; // After "---\n\n"
          content = content.slice(0, actualInsertIndex) + newEntry + content.slice(actualInsertIndex);
        } else {
          // Insert after section header
          const headerEnd = content.indexOf('\n', sectionIndex) + 1;
          content = content.slice(0, headerEnd) + '\n' + newEntry + content.slice(headerEnd);
        }
      }
      
      // Update Quick Index if needed
      this.updateQuickIndex(content, section, question);
      
      // Write updated content
      fs.writeFileSync(this.qaPath, content, 'utf8');
      console.log(`[qa-auto-updater] Added Q&A entry: "${question}"`);
      
      return true;
    } catch (error) {
      console.error('[qa-auto-updater] Error updating Q&A file:', error.message);
      return false;
    }
  }

  /**
   * Update Quick Index with new question
   */
  updateQuickIndex(content, section, question) {
    // This would update the Quick Index section
    // Implementation simplified for now
  }

  /**
   * Process evolution journal for Q&A opportunities
   */
  async processEvolutionJournal() {
    try {
      if (!fs.existsSync(this.journalPath)) {
        console.log('[qa-auto-updater] Evolution journal not found');
        return;
      }

      const journalContent = fs.readFileSync(this.journalPath, 'utf8');
      
      // Extract recent lessons (last 50 entries)
      const lessonMatches = journalContent.match(/### \d{4}-\d{2}-\d{2}: [^\n]+/g);
      if (!lessonMatches || lessonMatches.length === 0) {
        console.log('[qa-auto-updater] No lessons found in journal');
        return;
      }

      // Get recent lessons (last 10)
      const recentLessons = lessonMatches.slice(-10);
      
      let updatesCount = 0;
      
      recentLessons.forEach(lessonHeader => {
        // Extract question patterns from lesson
        const lessonStart = journalContent.indexOf(lessonHeader);
        const nextLessonStart = journalContent.indexOf('###', lessonStart + 1);
        const lessonContent = nextLessonStart === -1 
          ? journalContent.slice(lessonStart)
          : journalContent.slice(lessonStart, nextLessonStart);
        
        // Detect questions in lesson
        const questions = this.detectQuestions(lessonContent);
        
        questions.forEach(async question => {
          const questionKey = question.toLowerCase();
          
          // Skip if already exists
          if (this.qaEntries.has(questionKey)) {
            return;
          }
          
          // Extract answer
          const answer = this.extractAnswer(question, lessonContent);
          if (!answer) {
            return;
          }
          
          // Determine section
          const section = this.determineSection(question);
          
          // Determine confidence based on source
          let confidence = '⭐⭐⭐';
          if (lessonContent.includes('High') || lessonContent.includes('⭐⭐⭐⭐')) {
            confidence = '⭐⭐⭐⭐';
          }
          if (lessonContent.includes('⭐⭐⭐⭐⭐')) {
            confidence = '⭐⭐⭐⭐⭐';
          }
          
          // Update Q&A file
          const source = `Evolution Journal: ${lessonHeader.replace('### ', '')}`;
          await this.updateQAFile(question, answer, section, source, confidence);
          
          // Track in memory
          this.qaEntries.set(questionKey, true);
          updatesCount++;
        });
      });
      
      console.log(`[qa-auto-updater] Processed journal, ${updatesCount} Q&A entries added/updated`);
      return updatesCount;
    } catch (error) {
      console.error('[qa-auto-updater] Error processing evolution journal:', error.message);
      return 0;
    }
  }

  /**
   * Track question frequency from user interactions
   */
  trackQuestion(question) {
    const questionKey = question.toLowerCase();
    const currentCount = this.questionFrequency.get(questionKey) || 0;
    this.questionFrequency.set(questionKey, currentCount + 1);
    
    // If question asked 2+ times, consider adding to Q&A
    if (currentCount + 1 >= 2 && !this.qaEntries.has(questionKey)) {
      console.log(`[qa-auto-updater] Frequent question detected: "${question}" (${currentCount + 1} times)`);
      // Could trigger automatic Q&A generation here
    }
  }

  /**
   * Auto-update Q&A based on current patterns
   */
  async autoUpdate() {
    console.log('[qa-auto-updater] Starting automatic Q&A update...');
    
    // Process evolution journal
    const journalUpdates = await this.processEvolutionJournal();
    
    console.log(`[qa-auto-updater] Automatic update complete: ${journalUpdates} entries processed`);
    return {
      success: true,
      entriesProcessed: journalUpdates,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = QAAutoUpdater;

