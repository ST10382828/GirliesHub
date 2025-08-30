import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import {
  SmartToy,
  Send,
  Person,
  Clear,
  QuestionAnswer,
} from '@mui/icons-material';
import axios from 'axios';

const AIAssistantPage = () => {
  const { t } = useTranslation();
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t('aiAssistant.welcomeMessage'),
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    t('aiAssistant.quickQuestions.questions.financialSeminars'),
    t('aiAssistant.quickQuestions.questions.safeShelters'),
    t('aiAssistant.quickQuestions.questions.sanitaryProducts'),
    t('aiAssistant.quickQuestions.questions.submitRequest'),
    t('aiAssistant.quickQuestions.questions.availableServices'),
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset to welcome message when language changes to avoid stuck translations
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: t('aiAssistant.welcomeMessage'),
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
  }, [t]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call the AI API (using mock response for now)
      const response = await axios.post('/api/ai/chat', {
        message: inputMessage,
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling AI API:', error);
      
      // Fallback mock response
      const mockResponses = [
        t('aiAssistant.mockResponses.response1'),
        t('aiAssistant.mockResponses.response2'),
        t('aiAssistant.mockResponses.response3'),
        t('aiAssistant.mockResponses.response4'),
        t('aiAssistant.mockResponses.response5')
      ];

      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      const botMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: t('aiAssistant.welcomeMessage'),
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <SmartToy sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {t('aiAssistant.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            {t('aiAssistant.subtitle')}
          </Typography>
        </Box>

        {/* Quick Questions */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {t('aiAssistant.quickQuestions.title')}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {quickQuestions.map((question, index) => (
              <Chip
                key={index}
                label={question}
                variant="outlined"
                onClick={() => handleQuickQuestion(question)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Chat Container */}
        <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', maxHeight: '60vh' }}>
          {/* Chat Header */}
          <CardContent sx={{ pb: 1, borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <SmartToy />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {t('aiAssistant.chat.assistantName')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('aiAssistant.chat.status')}
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={clearChat} color="error">
                <Clear />
              </IconButton>
            </Box>
          </CardContent>

          {/* Messages Area */}
          <Box 
            sx={{ 
              flexGrow: 1, 
              overflow: 'auto', 
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 1,
                }}
              >
                {message.sender === 'bot' && (
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      mr: 1, 
                      width: 32, 
                      height: 32 
                    }}
                  >
                    <SmartToy fontSize="small" />
                  </Avatar>
                )}
                
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                    color: message.sender === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2,
                    borderTopLeftRadius: message.sender === 'bot' ? 0 : 2,
                    borderTopRightRadius: message.sender === 'user' ? 0 : 2,
                  }}
                >
                  <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                    {message.text}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      mt: 1, 
                      opacity: 0.7,
                      fontSize: '0.75rem',
                    }}
                  >
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </Typography>
                </Paper>

                {message.sender === 'user' && (
                  <Avatar 
                    sx={{ 
                      bgcolor: 'secondary.main', 
                      ml: 1, 
                      width: 32, 
                      height: 32 
                    }}
                  >
                    <Person fontSize="small" />
                  </Avatar>
                )}
              </Box>
            ))}
            
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    mr: 1, 
                    width: 32, 
                    height: 32 
                  }}
                >
                  <SmartToy fontSize="small" />
                </Avatar>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    bgcolor: 'grey.100',
                    borderRadius: 2,
                    borderTopLeftRadius: 0,
                  }}
                >
                  <Typography variant="body1">
                    {t('aiAssistant.chat.typing')}
                  </Typography>
                </Paper>
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                multiline
                maxRows={3}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('aiAssistant.chat.placeholder')}
                variant="outlined"
                size="small"
                disabled={isLoading}
              />
              <Button
                variant="contained"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                sx={{ 
                  minWidth: 'auto', 
                  px: 2,
                  height: 'fit-content',
                  alignSelf: 'flex-end',
                }}
              >
                <Send />
              </Button>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {t('aiAssistant.chat.keyboardHint')}
            </Typography>
          </Box>
        </Card>

        {/* Footer Info */}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            <QuestionAnswer sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
            {t('aiAssistant.footer')}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default AIAssistantPage;
