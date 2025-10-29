# Google Analytics Event Tracking Guide

## Overview
This portfolio website tracks comprehensive user interactions through Google Analytics 4 (GA4) events.

## Tracked Events

### Navigation Events
| Event Name | Category | When Triggered | Example Label |
|------------|----------|----------------|---------------|
| `tab_navigation` | Navigation | User switches tabs | "about", "experience", "courses" |
| `back_to_top` | Navigation | Click back to top button | "Back to Top Button" |
| `click` | Navigation | Mobile menu toggle | "Mobile Menu Open/Close" |

### User Preferences
| Event Name | Category | When Triggered | Example Label |
|------------|----------|----------------|---------------|
| `theme_toggle` | User Preferences | Switch dark/light mode | "dark", "light" |

### Call-to-Action Events
| Event Name | Category | When Triggered | Example Label |
|------------|----------|----------------|---------------|
| `click` | CTA | Hero section buttons | "Contact - Hero", "LinkedIn - Hero" |
| `download` | CTA | Resume download from hero | "Resume Download - Hero" |

### Content Engagement
| Event Name | Category | When Triggered | Example Label |
|------------|----------|----------------|---------------|
| `download` | PDF | Any PDF download | PDF file name or link text |
| `click` | External Link | External links clicked | "LinkedIn - [link text]" |
| `click` | Contact | Email/phone clicks | "Email - boworn.pem@gmail.com" |
| `click` | Certificate | Certificate card clicked | Certificate title |
| `click` | Content | Article card clicked | Article title |
| `view` | Course | Course card scrolled into view | Course title |

## How to View Analytics

### 1. Access Google Analytics
- URL: https://analytics.google.com/
- Select your E-Portfolio property
- Property ID: G-N59J8KNZ5D

### 2. Real-time Testing
**Path:** Reports → Realtime → Overview

Steps:
1. Open your website in another tab
2. Perform actions (click buttons, download PDF, switch tabs)
3. View real-time events in Google Analytics dashboard
4. Events appear within seconds

### 3. View Event Reports
**Path:** Reports → Engagement → Events

You'll see:
- List of all custom events
- Event count (total triggers)
- Total users per event
- Event value (if applicable)

### 4. Detailed Event Analysis
Click on any event name to see:
- Event parameters (category, label)
- User demographics
- Device types
- Geographic data
- Time-based trends

### 5. Create Custom Reports
**Path:** Explore → Create a new exploration

Suggested dimensions:
- Event name
- Event label
- Event category
- Page location
- Device category

Suggested metrics:
- Event count
- Total users
- Events per user
- Conversion rate

## Example Queries

### Most Popular CTA Buttons
- Dimension: Event label (filter category = "CTA")
- Metric: Event count
- Sort: Descending

### Most Viewed Courses
- Dimension: Event label (filter event_name = "view")
- Metric: Event count
- Sort: Descending

### Download Tracking
- Event name: "download"
- Group by: Event label
- See which PDFs/files are downloaded most

### Navigation Patterns
- Event name: "tab_navigation"
- Group by: Event label
- Understand which sections users visit most

## Testing Events Locally

Open browser console and run:
```javascript
// Test if gtag is loaded
console.log(typeof gtag);

// Manually trigger test event
trackEvent('test', 'Testing', 'Manual Test');
```

## Privacy & Data Collection
- No personally identifiable information (PII) is collected
- IP addresses are anonymized
- Users can opt-out via browser settings
- Complies with Google Analytics terms of service

## Support
For issues or questions about analytics implementation, contact: boworn.pem@gmail.com
