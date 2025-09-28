# 🎙️ Podcast Explorer

A responsive, accessible, and feature-rich **React web application** for discovering podcasts.  
It fetches live podcast data from the [Podcast API](https://podcast-api.netlify.app/) and allows users to **search, filter by genre, sort, paginate, and view podcast details in a modal**.

---

## 📌 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Accessibility & Responsiveness](#accessibility--responsiveness)
- [Rubric Compliance](#rubric-compliance)
- [Future Improvements](#future-improvements)
- [Links]
- [Project Structure](#project-structure)

---

## ✨ Features
- **Live API Fetching**  
  Retrieves podcast previews from the public Podcast API.

- **Search**  
  Instant search with case-insensitive matching.

- **Genre Filtering**  
  Dropdown filter to show only podcasts in the selected genre.

- **Sorting**  
  - Newest First  
  - Title A–Z  
  - Title Z–A  

- **Pagination**  
  Responsive pagination with smooth scroll to top on page change.

- **Podcast Modal**  
  Click any podcast card to view extended details (cover art, description, metadata).

- **Loading & Error States**  
  - Spinner animation while fetching.  
  - Friendly error messages if the API fails.

- **Pastel Theming**  
  Uses soft, unique pastel color palette for a clean modern design.

---

## 🛠 Tech Stack
- **React 18**
- **Vite** for fast dev/build
- **JavaScript (ES6+)**
- **CSS3 (custom, responsive & mobile-first)**
- **Fetch API** https://podcast-api.netlify.app/

---

##  🔗 Links
- **Roadmap.sh**
- **https://Vite.dev**
- **https://react.dev**
- **https://www.w3schools.com**
- **https://developer.mozilla.org**

----

## 📁 Project Structure
podcast-explorer/
├─ public/
│  ├─ favicon.ico             # Transparent podcast-themed favicon
├─ src/
│  ├─ components/
│  │  ├─ Filter.jsx           # Genre dropdown
│  │  ├─ SearchBar.jsx        # Live search input
│  │  ├─ SortDropdown.jsx     # Sorting options
│  │  ├─ PodcastList.jsx      # Grid of podcast cards
│  │  ├─ PodcastCard.jsx      # Single podcast card
│  │  ├─ Pagination.jsx       # Page navigation controls
│  │  └─ PodcastModal.jsx     # Modal for podcast details
│  ├─ data/
│  │  └─ genres.js            # Genre metadata
│  ├─ App.jsx                 # Main app logic (fetching, filtering, sorting, pagination)
│  ├─ index.css               # Styles (pastel-themed, responsive)
│  ├─ main.jsx                # React DOM mount
├─ index.html                 # Entry HTML
├─ package.json
└─ README.md
