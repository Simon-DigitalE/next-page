import React, { useState, useEffect } from 'react';
import _ from 'lodash';

// Comment out this line since we're not using the natural package
// const TfIdf = natural.TfIdf;

// Create a simple TfIdf implementation for the prototype
class TfIdf {
  constructor() {
    this.documents = [];
  }
  
  addDocument(text) {
    this.documents.push(text);
  }
  
  listTerms(index) {
    // Simple implementation to extract significant words
    const text = this.documents[index] || '';
    const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 3);
    const uniqueWords = [...new Set(words)];
    
    return uniqueWords.slice(0, 10).map(word => ({
      term: word,
      tfidf: Math.random() * 5 // Simulate TF-IDF score
    }));
  }
}
// RatingPopup - shows dialog for rating a book you've already read
const RatingPopup = ({ book, onClose, onAddToRead, colors }) => {
    const [rating, setRating] = useState(3);
    
    const handleAddToRead = () => {
      onAddToRead({...book, rating});
      onClose();
    };
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold" style={{ color: colors.primary.midnightBlue }}>
              Rate This Book
            </h3>
            <button 
              onClick={onClose}
              className="text-xl"
              style={{ color: colors.secondary.grey }}
            >
              ×
            </button>
          </div>
          
          <div className="flex mb-4">
            {book.coverImage && (
              <img 
                src={book.coverImage} 
                alt="" 
                className="h-24 w-16 mr-3 object-cover"
              />
            )}
            <div>
              <h4 className="font-medium" style={{ color: colors.primary.midnightBlue }}>
                {book.title}
              </h4>
              <p className="text-sm" style={{ color: colors.secondary.grey }}>
                by {book.author}
              </p>
              <p className="text-sm" style={{ color: colors.secondary.grey }}>
                {book.genre}
              </p>
            </div>
          </div>
          
          <div className="mb-5">
            <p className="mb-2 text-sm" style={{ color: colors.primary.midnightBlue }}>
              How would you rate this book?
            </p>
            <div className="flex justify-center mb-2">
              <StarRating 
                rating={rating} 
                onRatingChange={setRating} 
                interactive={true}
                size="large"
                color={colors.secondary.yellow}
              />
            </div>
            <p className="text-center text-sm" style={{ color: colors.secondary.grey }}>
              {rating === 0 ? "No rating" : 
               rating <= 1.5 ? "Hated it" :
               rating <= 2.5 ? "Not for me" :
               rating <= 3.5 ? "Pretty decent" :
               rating <= 4.5 ? "I liked it" : "Loved it"}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 rounded-md border hover:opacity-90"
              style={{ 
                borderColor: colors.primary.lightGrey,
                color: colors.primary.midnightBlue
              }}
            >
              Cancel
            </button>
            
            <button
              onClick={handleAddToRead}
              className="flex-1 py-2 px-4 rounded-md hover:opacity-90"
              style={{ 
                backgroundColor: colors.primary.blue, 
                color: colors.primary.white,
                fontWeight: 500
              }}
            >
              Add to Read Books
            </button>
          </div>
        </div>
      </div>
    );
  };import React, { useState, useEffect } from 'react';
  import { set } from 'lodash';
  
  // Digital Entrepreneur brand colors
  const colors = {
    primary: {
      midnightBlue: '#1A2238',
      blue: '#4B65AD',
      lightGrey: '#F2F5F9',
      white: '#FFFFFF',
      coolGradient: 'linear-gradient(to bottom right, #D8E0F8, #94D7D9)'
    },
    secondary: {
      teal: '#53A6AB',
      purple: '#9858A9',
      rose: '#BB5D6E',
      yellow: '#DFAC09',
      grey: '#62697E'
    }
  };
  
  // Initial book database
  const initialBookDatabase = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      features: ["classic", "american literature", "tragedy", "wealth", "love", "1920s"],
      genre: "Literary Fiction",
      description: "A portrayal of the American Dream and its decay in the 1920s. The story primarily concerns a young and mysterious millionaire, Jay Gatsby, and his obsession to reunite with his former lover, Daisy Buchanan.",
      coverImage: "/api/placeholder/80/120"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      features: ["classic", "american literature", "coming-of-age", "racism", "justice"],
      genre: "Literary Fiction",
      description: "A story of racial injustice and moral growth in the American South during the 1930s, told through the eyes of young Scout Finch. Her father, Atticus Finch, defends a Black man wrongly accused of a crime.",
      coverImage: "/api/placeholder/80/120"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      features: ["dystopian", "political", "totalitarianism", "surveillance", "classic"],
      genre: "Science Fiction",
      description: "A dystopian novel set in a totalitarian regime where government surveillance is omnipresent. The story follows Winston Smith as he rebels against the oppressive state and Big Brother.",
      coverImage: "/api/placeholder/80/120"
    },
    {
      id: 4,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      features: ["fantasy", "adventure", "quest", "dragons", "magic"],
      genre: "Fantasy",
      description: "A fantasy adventure about Bilbo Baggins, a hobbit who is reluctantly swept into an epic quest to reclaim the Lonely Mountain from the dragon Smaug, along with a group of dwarves.",
      coverImage: "/api/placeholder/80/120"
    },
    {
      id: 5,
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      features: ["fantasy", "magic", "coming-of-age", "boarding school", "friendship"],
      genre: "Fantasy",
      description: "The first book in the Harry Potter series follows a young wizard, Harry Potter, who discovers his magical heritage on his eleventh birthday when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.",
      coverImage: "/api/placeholder/80/120"
    },
    {
      id: 6,
      title: "The Hunger Games",
      author: "Suzanne Collins",
      features: ["dystopian", "young adult", "survival", "competition", "rebellion"],
      genre: "Science Fiction",
      description: "In a dystopian future, the nation of Panem forces each of its twelve districts to send two teenagers to compete in the Hunger Games, a televised fight to the death. Katniss Everdeen volunteers to take her sister's place.",
      coverImage: "/api/placeholder/80/120"
    },
    {
      id: 7,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      features: ["romance", "social criticism", "19th century", "marriage", "class"],
      genre: "Classic Romance",
      description: "A romantic novel of manners that follows the character development of Elizabeth Bennet, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
      coverImage: "/api/placeholder/80/120"
    },
    {
      id: 8,
      title: "The Road",
      author: "Cormac McCarthy",
      features: ["post-apocalyptic", "survival", "father-son relationship", "bleak", "journey"],
      genre: "Literary Fiction",
      description: "A post-apocalyptic novel about a father and his young son's journey across a desolate landscape years after an extinction event. It depicts their bond and their struggle to survive in a world of complete devastation.",
      coverImage: "/api/placeholder/80/120"
    },
    {
      id: 9,
      title: "Dune",
      author: "Frank Herbert",
      features: ["science fiction", "space opera", "politics", "religion", "ecology"],
      genre: "Science Fiction",
      description: "A complex blend of politics, religion, ecology, technology, and human emotion, set in the far future amidst a feudal interstellar society. It tells the story of young Paul Atreides and his journey to the desert planet Arrakis.",
      coverImage: "/api/placeholder/80/120"
    },
    {
      id: 10,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      features: ["fantasy", "epic", "quest", "good vs evil", "mythology"],
      genre: "Fantasy",
      description: "An epic high-fantasy novel that follows the quest to destroy the One Ring, a powerful artifact created by the Dark Lord Sauron. The story follows hobbit Frodo Baggins and the Fellowship of the Ring on their journey to Mount Doom.",
      coverImage: "/api/placeholder/80/120"
    }
  ];
  
  // Initial recommendations with reasoning for each recommendation
  const initialRecommendations = [
    {
      id: 101,
      title: "Brave New World",
      author: "Aldous Huxley",
      genre: "Science Fiction",
      description: "A dystopian novel set in a futuristic World State, inhabited by genetically modified citizens and an intelligence-based social hierarchy.",
      score: "8.5",
      similarityScore: "0.75",
      coverImage: "/api/placeholder/80/120",
      reasoning: "This book shares dystopian themes with George Orwell's 1984, exploring societal control and technology's impact on humanity. Its thought-provoking narrative and philosophical themes align with your interest in complex science fiction."
    },
    {
      id: 102,
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      genre: "Fantasy",
      description: "The tale of Kvothe, from his childhood in a troupe of traveling players, to years spent as a near-feral orphan in a crime-riddled city, to his daringly brazen yet successful bid to enter a difficult and dangerous school of magic.",
      score: "7.2",
      similarityScore: "0.65",
      coverImage: "/api/placeholder/80/120",
      reasoning: "Based on your interest in fantasy novels like Harry Potter and The Hobbit, you'll likely enjoy this coming-of-age story featuring a magic school. The immersive world-building and magical elements are similar to other fantasy titles in your collection."
    },
    {
      id: 103,
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
      genre: "Science Fiction",
      description: "The comedic adventures of Arthur Dent, the last human, who hitchhikes across space after Earth is demolished to make way for a hyperspace bypass.",
      score: "6.9",
      similarityScore: "0.60",
      coverImage: "/api/placeholder/80/120",
      reasoning: "This recommendation offers a humorous take on science fiction, providing a lighter contrast to the more serious dystopian sci-fi you've enjoyed. Its imaginative universe and satirical elements make it a refreshing addition to your reading list."
    },
    {
      id: 104,
      title: "Foundation",
      author: "Isaac Asimov",
      genre: "Science Fiction",
      description: "A complex saga of humans scattered on planets throughout the galaxy all living under the rule of the Galactic Empire.",
      score: "7.8",
      similarityScore: "0.70",
      coverImage: "/api/placeholder/80/120",
      reasoning: "This classic science fiction novel features grand-scale societal and political themes similar to Dune and 1984. The focus on how civilizations evolve and respond to crises aligns with your interest in thought-provoking science fiction."
    },
    {
      id: 105,
      title: "The Lies of Locke Lamora",
      author: "Scott Lynch",
      genre: "Fantasy",
      description: "An orphan's life is harsh—and often short—in the mysterious island city of Camorr. But young Locke Lamora dodges death and slavery to become a legendary thief.",
      score: "7.5",
      similarityScore: "0.62",
      coverImage: "/api/placeholder/80/120",
      reasoning: "This fantasy novel combines adventure and complex characters in a richly imagined world, similar to The Lord of the Rings and The Hobbit. The blend of heist elements with fantasy worldbuilding creates a unique experience that matches your taste profile."
    },
    {
      id: 106,
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      genre: "Classic Romance",
      description: "The story of a young orphan girl who becomes the governess at Thornfield Hall and falls in love with her mysterious employer.",
      score: "8.1",
      similarityScore: "0.72",
      coverImage: "/api/placeholder/80/120",
      reasoning: "Similar to Pride and Prejudice, this classic romance features strong character development and social commentary. The themes of personal growth and independence in a restrictive society align with your interest in character-driven classics."
    },
    {
      id: 107,
      title: "Wuthering Heights",
      author: "Emily Brontë",
      genre: "Classic Romance",
      description: "A turbulent tale of the intense love between Catherine Earnshaw and Heathcliff, a foundling adopted by Catherine's father.",
      score: "7.4",
      similarityScore: "0.65",
      coverImage: "/api/placeholder/80/120",
      reasoning: "This recommendation continues your exploration of classic romantic literature, offering a darker, more passionate counterpoint to Jane Austen's work. Its complex characters and exploration of destructive relationships add depth to your classic literature collection."
    },
    {
      id: 108,
      title: "The Road Less Traveled",
      author: "M. Scott Peck",
      genre: "Literary Fiction",
      description: "A timeless work that confronts the tough issues of life, love, and spiritual growth with wisdom and insight.",
      score: "7.0",
      similarityScore: "0.55",
      coverImage: "/api/placeholder/80/120",
      reasoning: "This thoughtful exploration of personal growth complements your interest in literary fiction. Similar to works like The Great Gatsby and To Kill a Mockingbird, it explores profound human themes while prompting personal reflection."
    }
  ];
  
  // Helper for rendering star ratings with half-star support and hover effects
  const StarRating = ({ rating, maxRating = 5, size = "normal", onRatingChange, interactive = false, color }) => {
    const [hoverRating, setHoverRating] = useState(null);
    
    // Convert to array of star values [1, 0.5, 0, 0, 0] for a 1.5 rating
    const getStarValues = (value) => {
      const stars = [];
      let remainingRating = value || 0;
      
      for (let i = 0; i < maxRating; i++) {
        if (remainingRating >= 1) {
          stars.push(1); // Full star
          remainingRating--;
        } else if (remainingRating >= 0.5) {
          stars.push(0.5); // Half star
          remainingRating -= 0.5;
        } else {
          stars.push(0); // Empty star
        }
      }
      
      return stars;
    };
    
    // Use hover rating if available, otherwise use actual rating
    const displayRating = hoverRating !== null ? hoverRating : rating;
    const starValues = getStarValues(displayRating);
    
    const handleStarClick = (index, halfStar) => {
      if (!interactive) return;
      
      // Calculate new rating
      let newRating;
      if (halfStar) {
        // If clicking on the left half of a star
        newRating = index + 0.5;
      } else {
        // If clicking on the right half or the whole star
        newRating = index + 1;
      }
      
      // If clicking on the same value, toggle off for better UX
      if (newRating === rating) {
        newRating = index;
      }
      
      onRatingChange(newRating);
    };
    
    const handleMouseEnter = (index, halfStar) => {
      if (!interactive) return;
      
      if (halfStar) {
        setHoverRating(index + 0.5);
      } else {
        setHoverRating(index + 1);
      }
    };
    
    const handleMouseLeave = () => {
      if (interactive) {
        setHoverRating(null);
      }
    };
    
    const sizeClass = size === "small" ? "text-lg" : size === "large" ? "text-3xl" : "text-2xl";
    
    // Function to get rating description
    const getRatingText = (rating) => {
      if (rating === 0) return "No rating";
      if (rating <= 1.5) return "Hated it";
      if (rating <= 2.5) return "Not for me";
      if (rating <= 3.5) return "Pretty decent";
      if (rating <= 4.5) return "I liked it";
      return "Loved it";
    };
    
    return (
      <div>
        <div className="flex items-center" onMouseLeave={handleMouseLeave}>
          {Array.from({ length: maxRating }).map((_, index) => (
            <div 
              key={index}
              className={`inline-block ${sizeClass} ${interactive ? 'cursor-pointer' : ''}`}
              style={{ position: 'relative', width: '1em', height: '1em' }}
            >
              {/* Empty star (background) */}
              <span 
                style={{ 
                  position: 'absolute',
                  color: '#D1D5DB'
                }}
              >
                ☆
              </span>
              
              {/* Full or half star (foreground) */}
              {starValues[index] > 0 && (
                <span 
                  style={{ 
                    position: 'absolute',
                    width: starValues[index] === 0.5 ? '50%' : '100%',
                    overflow: 'hidden',
                    color: color || colors.secondary.yellow
                  }}
                >
                  ★
                </span>
              )}
              
              {/* Left half interactive area */}
              {interactive && (
                <span 
                  style={{ 
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '50%',
                    height: '100%',
                    zIndex: 10,
                    cursor: 'pointer'
                  }}
                  onClick={() => handleStarClick(index, true)}
                  onMouseEnter={() => handleMouseEnter(index, true)}
                />
              )}
              
              {/* Right half interactive area */}
              {interactive && (
                <span 
                  style={{ 
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: '50%',
                    height: '100%',
                    zIndex: 10,
                    cursor: 'pointer'
                  }}
                  onClick={() => handleStarClick(index, false)}
                  onMouseEnter={() => handleMouseEnter(index, false)}
                />
              )}
            </div>
          ))}
          
          {/* Display hover rating */}
          {interactive && hoverRating !== null && (
            <span className="ml-2 text-xs" style={{ color: colors.secondary.grey }}>
              {getRatingText(hoverRating)}
            </span>
          )}
        </div>
        
        {/* Display rating text if interactive and there's a rating */}
        {interactive && hoverRating === null && rating > 0 && (
          <div className="mt-1 text-xs text-center" style={{ color: colors.secondary.grey }}>
            {getRatingText(rating)}
          </div>
        )}
      </div>
    );
  };
  
  // BookForm – handles book entry with autocomplete suggestions
  const BookForm = ({ onAddBook, bookDatabase, colors }) => {
    const [newBookTitle, setNewBookTitle] = useState('');
    const [newBookAuthor, setNewBookAuthor] = useState('');
    const [newBookRating, setNewBookRating] = useState(5);
    const [titleSuggestions, setTitleSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
  
    const handleTitleChange = (e) => {
      const value = e.target.value;
      setNewBookTitle(value);
      
      if (value.trim().length > 2) {
        const results = bookDatabase.filter(book =>
          book.title.toLowerCase().includes(value.toLowerCase())
        );
        setTitleSuggestions(results.slice(0, 5));
        setShowSuggestions(true);
      } else {
        setTitleSuggestions([]);
        setShowSuggestions(false);
      }
    };
  
    const selectSuggestion = (book) => {
      setNewBookTitle(book.title);
      setNewBookAuthor(book.author);
      setShowSuggestions(false);
    };
  
    const handleAddBook = () => {
      if (newBookTitle.trim() === '') return;
      
      const foundBook = bookDatabase.find(
        book => book.title.toLowerCase() === newBookTitle.toLowerCase()
      );
      
      const newBook = {
        id: foundBook ? foundBook.id : Date.now(),
        title: newBookTitle,
        author: newBookAuthor || 'Unknown Author',
        rating: newBookRating,
        features: foundBook ? foundBook.features : [],
        genre: foundBook ? foundBook.genre : 'Unknown',
        coverImage: foundBook ? foundBook.coverImage : null,
        description: foundBook ? foundBook.description : 'No synopsis available'
      };
      
      onAddBook(newBook);
      setNewBookTitle('');
      setNewBookAuthor('');
      setNewBookRating(5);
    };
  
    return (
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4" style={{ 
          color: colors.primary.midnightBlue,
          fontFamily: 'Cabin, sans-serif',
          fontWeight: 700
        }}>Add Books You've Read</h2>
        
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium" style={{ 
              color: colors.primary.midnightBlue
            }}>Book Title</label>
            <input
              type="text"
              value={newBookTitle}
              onChange={handleTitleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter book title"
              style={{ borderColor: colors.primary.blue }}
            />
            {showSuggestions && titleSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {titleSuggestions.map((book) => (
                  <div
                    key={book.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => selectSuggestion(book)}
                  >
                    {book.coverImage && (
                      <img 
                        src={book.coverImage} 
                        alt=""
                        className="h-12 w-8 mr-2 object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium" style={{ color: colors.primary.midnightBlue }}>
                        {book.title}
                      </div>
                      <div className="text-sm" style={{ color: colors.secondary.grey }}>
                        by {book.author}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium" style={{ 
              color: colors.primary.midnightBlue
            }}>Author (optional)</label>
            <input
              type="text"
              value={newBookAuthor}
              onChange={(e) => setNewBookAuthor(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter author name"
              style={{ borderColor: colors.primary.blue }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium" style={{ 
              color: colors.primary.midnightBlue
            }}>Your Rating</label>
            <div className="mt-1">
              <StarRating 
                rating={newBookRating} 
                onRatingChange={setNewBookRating} 
                interactive={true}
                color={colors.secondary.yellow}
              />
              <div className="mt-1 text-xs" style={{ color: colors.secondary.grey }}>
                {newBookRating} / 5 stars
              </div>
            </div>
          </div>
          
          <button
            onClick={handleAddBook}
            className="py-2 px-4 rounded-md hover:opacity-90"
            style={{ 
              backgroundColor: colors.primary.blue, 
              color: colors.primary.white,
              fontWeight: 700
            }}
          >
            Add Book
          </button>
        </div>
      </div>
    );
  };
  
  // ReadBookList – displays books the user has read with ratings
  const ReadBookList = ({ userBooks, onRemoveBook, onUpdateRating, onMoveToReadingList, colors }) => {
    const [editingId, setEditingId] = useState(null);
    const [editRating, setEditRating] = useState(5);
  
    const startEditing = (book) => {
      setEditingId(book.id);
      setEditRating(book.rating || 3); // Default to 3 if no rating
    };
  
    const saveRating = (bookId) => {
      onUpdateRating(bookId, editRating);
      setEditingId(null);
    };
  
    const cancelEditing = () => {
      setEditingId(null);
    };
  
    return (
      <div className="p-4 bg-white rounded-lg shadow h-full">
        <h3 className="text-lg font-semibold mb-3" style={{ 
            color: colors.primary.midnightBlue,
            fontWeight: 700
          }}>Books You've Read</h3>
        {userBooks.length === 0 ? (
          <p style={{ color: colors.secondary.grey }}>
            You haven't added any books yet.
          </p>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {userBooks.map(book => (
              <div key={book.id} className="flex justify-between items-start p-3 border rounded-md" style={{ borderColor: colors.primary.lightGrey }}>
                <div className="flex">
                  {book.coverImage && (
                    <img 
                      src={book.coverImage} 
                      alt="" 
                      className="h-16 w-12 mr-3 object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-medium" style={{ 
                      color: colors.primary.midnightBlue
                    }}>{book.title}</h3>
                    <p className="text-sm" style={{ 
                      color: colors.secondary.grey
                    }}>by {book.author}</p>
                    <p className="text-xs" style={{ 
                      color: colors.secondary.grey
                    }}>{book.genre || 'Unknown genre'}</p>
                    
                    {/* Rating display or editor */}
                    {editingId === book.id ? (
                      <div className="mt-1">
                        <StarRating 
                          rating={editRating} 
                          onRatingChange={setEditRating} 
                          interactive={true}
                          size="small"
                          color={colors.secondary.yellow}
                        />
                        <div className="flex mt-1 space-x-2">
                          <button 
                            onClick={() => saveRating(book.id)} 
                            className="text-xs py-1 px-2 rounded"
                            style={{ backgroundColor: colors.secondary.teal, color: colors.primary.white }}
                          >
                            Save
                          </button>
                          <button 
                            onClick={cancelEditing}
                            className="text-xs py-1 px-2 rounded"
                            style={{ backgroundColor: colors.primary.lightGrey, color: colors.primary.midnightBlue }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="cursor-pointer mt-1" 
                        onClick={() => startEditing(book)}
                        title="Click to edit rating"
                      >
                        <StarRating 
                          rating={book.rating || 0} 
                          size="small"
                          color={colors.secondary.yellow}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => onRemoveBook(book.id)}
                    className="text-xs py-1 px-2 rounded hover:opacity-80"
                    style={{ 
                      color: colors.secondary.rose,
                      border: `1px solid ${colors.secondary.rose}`,
                      backgroundColor: 'transparent'
                    }}
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => onMoveToReadingList(book)}
                    className="text-xs py-1 px-2 rounded hover:opacity-80 whitespace-nowrap"
                    style={{ 
                      color: colors.secondary.purple,
                      border: `1px solid ${colors.secondary.purple}`,
                      backgroundColor: 'transparent'
                    }}
                  >
                    Move to Reading List
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  // ReadingList – displays books the user wants to read
  const ReadingList = ({ readingList, onRemoveFromList, onMarkAsRead, onUpdatePosition, colors }) => {
    const [draggingId, setDraggingId] = useState(null);
    
    // Simple drag-and-drop for reordering
    const handleDragStart = (bookId) => {
      setDraggingId(bookId);
    };
    
    const handleDragOver = (e, targetId) => {
      e.preventDefault();
      if (draggingId === null || draggingId === targetId) return;
      
      onUpdatePosition(draggingId, targetId);
      setDraggingId(null);
    };
    
    return (
      <div className="p-4 bg-white rounded-lg shadow h-full">
        <h3 className="text-lg font-semibold mb-3" style={{ 
            color: colors.primary.midnightBlue,
            fontWeight: 700
          }}>Reading List</h3>
        {readingList.length === 0 ? (
          <p style={{ color: colors.secondary.grey }}>
            Your reading list is empty. Add books from recommendations.
          </p>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {readingList.map((book, index) => (
              <div 
                key={book.id} 
                className="flex justify-between items-start p-3 border rounded-md cursor-move"
                style={{ 
                  borderColor: colors.primary.lightGrey,
                  backgroundColor: draggingId === book.id ? colors.primary.lightGrey : 'white'
                }}
                draggable="true"
                onDragStart={() => handleDragStart(book.id)}
                onDragOver={(e) => handleDragOver(e, book.id)}
              >
                <div className="flex">
                  <div className="mr-3 flex flex-col items-center justify-center">
                    <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold" style={{ color: colors.primary.midnightBlue }}>
                      {index + 1}
                    </span>
                  </div>
                  {book.coverImage && (
                    <img 
                      src={book.coverImage} 
                      alt="" 
                      className="h-16 w-12 mr-3 object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-medium" style={{ 
                      color: colors.primary.midnightBlue
                    }}>{book.title}</h3>
                    <p className="text-sm" style={{ 
                      color: colors.secondary.grey
                    }}>by {book.author}</p>
                    <p className="text-xs" style={{ 
                      color: colors.secondary.grey
                    }}>{book.genre || 'Unknown genre'}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => onRemoveFromList(book.id)}
                    className="text-xs py-1 px-2 rounded hover:opacity-80"
                    style={{ 
                      color: colors.secondary.rose,
                      border: `1px solid ${colors.secondary.rose}`,
                      backgroundColor: 'transparent'
                    }}
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => onMarkAsRead(book)}
                    className="text-xs py-1 px-2 rounded hover:opacity-80"
                    style={{ 
                      color: colors.secondary.teal,
                      border: `1px solid ${colors.secondary.teal}`,
                      backgroundColor: 'transparent'
                    }}
                  >
                    Mark as Read
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  // LibrarySection – combines read books and reading list
  const LibrarySection = ({ userBooks, readingList, onRemoveBook, onUpdateRating, onRemoveFromList, onMarkAsRead, onMoveToReadingList, onUpdatePosition, colors }) => {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4" style={{ 
            color: colors.primary.midnightBlue,
            fontWeight: 700
          }}>Your Library</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReadBookList 
            userBooks={userBooks} 
            onRemoveBook={onRemoveBook} 
            onUpdateRating={onUpdateRating}
            onMoveToReadingList={onMoveToReadingList}
            colors={colors} 
          />
          
          <ReadingList 
            readingList={readingList}
            onRemoveFromList={onRemoveFromList}
            onMarkAsRead={onMarkAsRead}
            onUpdatePosition={onUpdatePosition}
            colors={colors}
          />
        </div>
      </div>
    );
  };
  
  // StatsDashboard – displays reading statistics
  const StatsDashboard = ({ userBooks, colors }) => {
    const totalBooks = userBooks.length;
    
    // Calculate average rating, handling missing/undefined ratings
    const calculateAverageRating = () => {
      const booksWithRatings = userBooks.filter(book => book.rating !== undefined);
      if (booksWithRatings.length === 0) return 0;
      
      const sum = booksWithRatings.reduce((total, book) => total + (book.rating || 0), 0);
      return (sum / booksWithRatings.length).toFixed(1);
    };
    
    const averageRating = calculateAverageRating();
    
    const getTopGenre = () => {
      const genres = userBooks.map(book => book.genre).filter(g => g && g !== 'Unknown');
      if (genres.length === 0) return 'N/A';
      
      const counts = {};
      genres.forEach(genre => {
        counts[genre] = (counts[genre] || 0) + 1;
      });
      
      let topGenre = null;
      let maxCount = 0;
      
      for (const genre in counts) {
        if (counts[genre] > maxCount) {
          maxCount = counts[genre];
          topGenre = genre;
        }
      }
      
      return topGenre || 'N/A';
    };
    
    const topGenre = getTopGenre();
  
    return (
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4" style={{ 
          color: colors.primary.midnightBlue,
          fontWeight: 700
        }}>Your Reading Stats</h2>
        {totalBooks === 0 ? (
          <p style={{ color: colors.secondary.grey }}>
            Add some books to see your stats.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 rounded-lg" style={{ background: colors.primary.coolGradient }}>
              <h3 className="text-lg font-medium" style={{ color: colors.primary.midnightBlue }}>
                Total Books
              </h3>
              <p className="text-3xl font-bold" style={{ color: colors.primary.midnightBlue }}>
                {totalBooks}
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ background: 'linear-gradient(to bottom right, #F1CFD5, #FDE386)' }}>
              <h3 className="text-lg font-medium" style={{ color: colors.primary.midnightBlue }}>
                Average Rating
              </h3>
              <p className="text-3xl font-bold" style={{ color: colors.primary.midnightBlue }}>
                {averageRating}
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ background: colors.primary.coolGradient }}>
              <h3 className="text-lg font-medium" style={{ color: colors.primary.midnightBlue }}>
                Top Genre
              </h3>
              <p className="text-3xl font-bold" style={{ color: colors.primary.midnightBlue }}>
                {topGenre}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // GenreFilter - dropdown for filtering recommendations by genre
  const GenreFilter = ({ genres, selectedGenre, onSelectGenre, colors }) => {
    return (
      <div className="mb-4 flex items-center">
        <label className="mr-2 text-sm font-medium" style={{ color: colors.primary.midnightBlue }}>
          Filter by Genre:
        </label>
        <select
          value={selectedGenre || ''}
          onChange={e => onSelectGenre(e.target.value === '' ? null : e.target.value)}
          className="p-2 border rounded-md"
          style={{ borderColor: colors.primary.blue }}
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
    );
  };
  
  // ReasoningPopup - shows explanation for recommendation
  const ReasoningPopup = ({ book, onClose, colors, getAmazonLink }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold" style={{ color: colors.primary.midnightBlue }}>
              Why We Recommend This Book
            </h3>
            <button 
              onClick={onClose}
              className="text-xl"
              style={{ color: colors.secondary.grey }}
            >
              ×
            </button>
          </div>
          
          <div className="flex mb-4">
            {book.coverImage && (
              <img 
                src={book.coverImage} 
                alt=""
                className="h-24 w-16 mr-3 object-cover"
              />
            )}
            <div>
              <h4 className="font-medium" style={{ color: colors.primary.midnightBlue }}>
                {book.title}
              </h4>
              <p className="text-sm" style={{ color: colors.secondary.grey }}>
                by {book.author}
              </p>
              <p className="text-sm" style={{ color: colors.secondary.grey }}>
                {book.genre}
              </p>
            </div>
          </div>
          
          <div className="mb-3 text-sm" style={{ color: colors.primary.midnightBlue }}>
            {book.reasoning || "This book matches your reading preferences and has similar themes to books you've enjoyed."}
          </div>
          
          {book.similarityScore && parseFloat(book.similarityScore) > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="text-xs px-2 py-1 rounded-full" style={{ 
                backgroundColor: colors.secondary.purple,
                color: colors.primary.white
              }}>
                Content similarity: {(parseFloat(book.similarityScore) * 100).toFixed(0)}%
              </div>
            </div>
          )}
          
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 rounded-md hover:opacity-90"
              style={{ 
                backgroundColor: colors.primary.blue, 
                color: colors.primary.white,
                fontWeight: 500
              }}
            >
              Got It
            </button>
            
            {book.asin && (
              <a
                href={getAmazonLink(book.asin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-4 rounded-md text-center hover:opacity-90"
                style={{ 
                  backgroundColor: "#FF9900", 
                  color: "#000000",
                  fontWeight: 500
                }}
              >
                View on Amazon
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  // RecommendationList – shows recommended books with genre filtering
  const RecommendationList = ({ recommendations, onAddBook, onFeedback, onMarkAsRead, feedbackMap, colors, hasBooks }) => {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [showReasoningFor, setShowReasoningFor] = useState(null);
    const [showRatingFor, setShowRatingFor] = useState(null);
    
    // Amazon affiliate tag - would come from your environment variables in a real app
    const affiliateTag = "youraffiliatetaghere-20"; 
    
    // Extract unique genres from recommendations
    const allGenres = [...new Set(recommendations.map(book => book.genre))];
    
    // Filter recommendations by selected genre
    const filteredRecs = selectedGenre 
      ? recommendations.filter(book => book.genre === selectedGenre)
      : recommendations;
    
    // Always show top 5 (or all if less than 5)
    const displayRecs = filteredRecs.slice(0, 5);
    
    // Get the book for which we're showing reasoning or rating
    const selectedBook = showReasoningFor 
      ? recommendations.find(book => book.id === showReasoningFor) 
      : showRatingFor
      ? recommendations.find(book => book.id === showRatingFor)
      : null;
      
    // Generate Amazon affiliate link
    const getAmazonLink = (asin) => {
      if (!asin) return null;
      return `https://www.amazon.com/dp/${asin}?tag=${affiliateTag}`;
    };
  
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4" style={{ 
            color: colors.primary.midnightBlue,
            fontWeight: 700
          }}>Recommended Books</h2>
        
        {!hasBooks ? (
          <p style={{ color: colors.secondary.grey }}>
            Add some books you've read to get recommendations
          </p>
        ) : recommendations.length === 0 ? (
          <p style={{ color: colors.secondary.grey }}>
            No recommendations found based on your preferences
          </p>
        ) : (
          <div>
            <GenreFilter 
              genres={allGenres} 
              selectedGenre={selectedGenre} 
              onSelectGenre={setSelectedGenre}
              colors={colors}
            />
            
            {displayRecs.length === 0 ? (
              <p style={{ color: colors.secondary.grey }}>
                No recommendations found for the selected genre
              </p>
            ) : (
              <div className="space-y-4">
                {displayRecs.map(book => (
                  <div key={book.id} className="p-3 border rounded-md flex" style={{ borderColor: colors.primary.lightGrey }}>
                    {book.coverImage && (
                      <img 
                        src={book.coverImage} 
                        alt="" 
                        className="h-24 w-16 mr-3 object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium" style={{ 
                          color: colors.primary.midnightBlue
                        }}>{book.title}</h3>
                      <p className="text-sm" style={{ 
                          color: colors.secondary.grey
                        }}>by {book.author}</p>
                      <p className="text-sm" style={{ 
                          color: colors.secondary.grey
                        }}>Genre: {book.genre}</p>
                      <p className="text-xs mt-2" style={{ 
                          color: colors.secondary.grey
                        }}>{book.description}</p>
                      
                      <div className="mt-2 flex items-center flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 rounded-full" style={{ 
                          backgroundColor: colors.primary.lightGrey,
                          color: colors.primary.blue
                        }}>
                          Match score: {book.score}
                        </span>
                        
                        {book.similarityScore && parseFloat(book.similarityScore) > 0 && (
                          <span className="text-xs px-2 py-1 rounded-full" style={{ 
                            backgroundColor: colors.secondary.purple,
                            color: colors.primary.white
                          }}>
                            Content similarity: {(parseFloat(book.similarityScore) * 100).toFixed(0)}%
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          onClick={() => onAddBook(book)}
                          className="text-sm py-1 px-2 rounded-md hover:opacity-90"
                          style={{ 
                            backgroundColor: colors.secondary.teal,
                            color: colors.primary.white,
                            fontWeight: 500
                          }}
                        >
                          Add to Reading List
                        </button>
                        
                        <button
                          onClick={() => setShowRatingFor(book.id)}
                          className="text-sm py-1 px-2 rounded-md hover:opacity-90"
                          style={{ 
                            backgroundColor: colors.primary.blue,
                            color: colors.primary.white,
                            fontWeight: 500
                          }}
                        >
                          I've Read This
                        </button>
                        
                        <button 
                          onClick={() => onFeedback(book.id, 'like')}
                          className="text-sm py-1 px-2 rounded-md"
                          style={{
                            backgroundColor: feedbackMap[book.id] === 'like' ? colors.secondary.teal : colors.primary.lightGrey,
                            color: feedbackMap[book.id] === 'like' ? colors.primary.white : colors.primary.midnightBlue
                          }}
                        >
                          👍 Like
                        </button>
                        
                        <button 
                          onClick={() => onFeedback(book.id, 'dislike')}
                          className="text-sm py-1 px-2 rounded-md"
                          style={{
                            backgroundColor: feedbackMap[book.id] === 'dislike' ? colors.secondary.rose : colors.primary.lightGrey,
                            color: feedbackMap[book.id] === 'dislike' ? colors.primary.white : colors.primary.midnightBlue
                          }}
                        >
                          👎 Dislike
                        </button>
                        
                        <button
                          onClick={() => setShowReasoningFor(book.id)}
                          className="text-sm py-1 px-2 rounded-md"
                          style={{ 
                            backgroundColor: colors.primary.lightGrey,
                            color: colors.secondary.purple,
                            fontWeight: 500
                          }}
                        >
                          Why this book?
                        </button>
                        
                        {book.asin && (
                          <a
                            href={getAmazonLink(book.asin)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm py-1 px-2 rounded-md hover:opacity-90"
                            style={{ 
                              backgroundColor: "#FF9900", 
                              color: "#000000",
                              fontWeight: 500
                            }}
                          >
                            Buy on Amazon
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Reasoning Popup */}
            {showReasoningFor && selectedBook && (
              <ReasoningPopup 
                book={selectedBook} 
                onClose={() => setShowReasoningFor(null)}
                colors={colors}
                getAmazonLink={getAmazonLink}
              />
            )}
            
            {/* Rating Popup */}
            {showRatingFor && selectedBook && (
              <RatingPopup 
                book={selectedBook} 
                onClose={() => setShowRatingFor(null)}
                onAddToRead={onMarkAsRead}
                colors={colors}
              />
            )}
          </div>
        )}
      </div>
    );
  };
  
  // Main App Component
  const BookRecommendationApp = () => {
      // Add features to each initial book
      const booksWithFeatures = initialBookDatabase.map(book => {
        let features = book.features || [];
        
        // Add common features based on the genre
        if (book.genre === "Science Fiction" && !features.includes("science fiction")) {
          features.push("science fiction");
        }
        if (book.genre === "Fantasy" && !features.includes("fantasy")) {
          features.push("fantasy");
        }
        if (book.genre === "Literary Fiction" && !features.includes("literary")) {
          features.push("literary");
        }
        
        return {
          ...book,
          features
        };
      });
      
      const [bookDatabase] = useState(booksWithFeatures);
    const [userBooks, setUserBooks] = useState([]);
    const [readingList, setReadingList] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [feedbackMap, setFeedbackMap] = useState({});
    
    // Add a book to reading list
    const addToReadingList = (book) => {
      // Check if book already exists in either collection
      if (userBooks.some(b => b.id === book.id) || readingList.some(b => b.id === book.id)) {
        return;
      }
      
      setReadingList([...readingList, book]);
    };
    
    // Add a book to user's collection (read books)
    const addToReadBooks = (book) => {
      // Check if book already exists in user's collection
      if (userBooks.some(b => b.id === book.id)) return;
      
      // Remove from reading list if it's there
      if (readingList.some(b => b.id === book.id)) {
        setReadingList(readingList.filter(b => b.id !== book.id));
      }
      
      setUserBooks([...userBooks, book]);
    };
    
    // Remove a book from user's collection
    const removeBook = (id) => {
      setUserBooks(userBooks.filter(book => book.id !== id));
    };
    
    // Remove a book from reading list
    const removeFromReadingList = (id) => {
      setReadingList(readingList.filter(book => book.id !== id));
    };
    
    // Move a book from read to reading list
    const moveToReadingList = (book) => {
      // Remove from read books
      setUserBooks(userBooks.filter(b => b.id !== book.id));
      
      // Add to reading list
      if (!readingList.some(b => b.id === book.id)) {
        setReadingList([...readingList, book]);
      }
    };
    
    // Mark a book as read (move from reading list to read books)
    const markAsRead = (book) => {
      // Remove from reading list
      setReadingList(readingList.filter(b => b.id !== book.id));
      
      // Add to read books
      if (!userBooks.some(b => b.id === book.id)) {
        setUserBooks([...userBooks, { ...book, rating: 0 }]);
      }
    };
    
    // Update a book's rating
    const updateBookRating = (bookId, newRating) => {
      setUserBooks(userBooks.map(book => 
        book.id === bookId 
          ? { ...book, rating: newRating }
          : book
      ));
    };
    
    // Update reading list order
    const updateReadingListPosition = (dragId, dropId) => {
      const dragIndex = readingList.findIndex(book => book.id === dragId);
      const dropIndex = readingList.findIndex(book => book.id === dropId);
      
      if (dragIndex === -1 || dropIndex === -1) return;
      
      const newList = [...readingList];
      const [draggedItem] = newList.splice(dragIndex, 1);
      newList.splice(dropIndex, 0, draggedItem);
      
      setReadingList(newList);
    };
    
    // Handle recommendation feedback
    const handleFeedback = (bookId, type) => {
      setFeedbackMap(prev => {
        // If same feedback type, toggle it off
        if (prev[bookId] === type) {
          const newMap = {...prev};
          delete newMap[bookId];
          return newMap;
        }
        // Otherwise set new feedback
        return {...prev, [bookId]: type};
      });
    };
    
    // Update recommendations when user books or reading list changes
    useEffect(() => {
      if (userBooks.length === 0 && readingList.length === 0) {
        setRecommendations([]);
        return;
      }
      
      // For the prototype, we'll use a more sophisticated algorithm that factors in ratings
      
      // Step 1: Generate a user preference profile based on rated books
      const userPreferences = {
        genrePreferences: {},
        authorPreferences: {},
        featurePreferences: {}
      };
      
      // Calculate normalized rating impact (converts 1-5 scale to -1 to +1 scale)
      // 1 star = -1 (strong negative), 3 stars = 0 (neutral), 5 stars = +1 (strong positive)
      const calculateRatingImpact = (rating) => {
        if (!rating && rating !== 0) return 0; // No rating
        return (rating - 3) / 2; // Convert 1-5 scale to -1 to +1 scale
      };
      
      // Process user's read books to build preference profile
      userBooks.forEach(book => {
        const ratingImpact = calculateRatingImpact(book.rating);
        
        // Update genre preferences
        if (book.genre) {
          userPreferences.genrePreferences[book.genre] = 
            (userPreferences.genrePreferences[book.genre] || 0) + ratingImpact;
        }
        
        // Update author preferences
        if (book.author) {
          userPreferences.authorPreferences[book.author] = 
            (userPreferences.authorPreferences[book.author] || 0) + ratingImpact;
        }
        
        // Update feature/theme preferences
        if (book.features && Array.isArray(book.features)) {
          book.features.forEach(feature => {
            userPreferences.featurePreferences[feature] = 
              (userPreferences.featurePreferences[feature] || 0) + ratingImpact;
          });
        }
      });
      
      // Step 2: Score each potential recommendation
      // Find books not in user's collection or reading list
      const potentialRecommendations = initialRecommendations.filter(
        rec => !userBooks.some(book => book.id === rec.id) && 
               !readingList.some(book => book.id === rec.id)
      );
      
      const scoredRecommendations = potentialRecommendations.map(book => {
        let score = parseFloat(book.score); // Base score from initial data
        
        // Adjust score based on genre preferences (up to +/- 3 points)
        if (book.genre && userPreferences.genrePreferences[book.genre] !== undefined) {
          score += userPreferences.genrePreferences[book.genre] * 3;
        }
        
        // Adjust score based on author preferences (up to +/- 2 points)
        if (book.author && userPreferences.authorPreferences[book.author] !== undefined) {
          score += userPreferences.authorPreferences[book.author] * 2;
        }
        
        // Adjust score based on feature/theme preferences (up to +/- 2 points)
        let featureScore = 0;
        let featureCount = 0;
        if (book.features && Array.isArray(book.features)) {
          book.features.forEach(feature => {
            if (userPreferences.featurePreferences[feature] !== undefined) {
              featureScore += userPreferences.featurePreferences[feature];
              featureCount++;
            }
          });
        }
        
        if (featureCount > 0) {
          score += (featureScore / featureCount) * 2;
        }
        
        // Apply user feedback adjustments
        if (feedbackMap[book.id] === 'like') {
          score += 1.5; // Boost liked books
        } else if (feedbackMap[book.id] === 'dislike') {
          score -= 2; // Penalize disliked books
        }
        
        // Ensure score doesn't go below 0
        score = Math.max(0, score);
        
        return {
          ...book,
          score: score.toFixed(1),
          adjustedByRatings: true // Flag to indicate rating-based adjustments
        };
      });
      
      // Sort by adjusted score
      const sortedRecs = [...scoredRecommendations].sort((a, b) => 
        parseFloat(b.score) - parseFloat(a.score)
      );
      
      // Step 3: Generate additional recommendations if we have fewer than 5
      const MIN_RECOMMENDATIONS = 5;
      
      if (sortedRecs.length < MIN_RECOMMENDATIONS) {
        // Get the favorite genres based on user's books
        const genreCounts = {};
        userBooks.forEach(book => {
          if (book.genre) {
            genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
          }
        });
        
        const favoriteGenres = Object.entries(genreCounts)
          .sort((a, b) => b[1] - a[1])
          .map(entry => entry[0]);
        
        // If no favorite genres, use a default list
        const targetGenres = favoriteGenres.length > 0 
          ? favoriteGenres 
          : ['Science Fiction', 'Fantasy', 'Literary Fiction', 'Classic Romance'];
        
        // Create additional dynamic recommendations
        const dynamicRecommendations = [
          {
            id: 'dynamic-1',
            title: "The Left Hand of Darkness",
            author: "Ursula K. Le Guin",
            genre: "Science Fiction",
            description: "A groundbreaking science fiction novel that explores themes of gender, politics, and society on a distant planet where inhabitants can change their gender.",
            score: "7.0",
            similarityScore: "0.60",
            coverImage: "/api/placeholder/80/120",
            reasoning: "This classic science fiction novel explores complex societal themes that align with your reading preferences. Le Guin's thoughtful world-building and character development provide a rich reading experience.",
            features: ["science fiction", "sociological", "alien cultures", "gender", "award-winning"],
            adjustedByRatings: false,
            dynamicallyAdded: true
          },
          {
            id: 'dynamic-2',
            title: "Station Eleven",
            author: "Emily St. John Mandel",
            genre: "Literary Fiction",
            description: "A post-apocalyptic novel that follows a nomadic group of actors and musicians traveling between settlements after a devastating flu pandemic.",
            score: "7.2",
            similarityScore: "0.58",
            coverImage: "/api/placeholder/80/120",
            reasoning: "This literary novel with sci-fi elements examines art, memory, and what remains after civilization collapses. Its character-focused storytelling and thoughtful themes match your reading preferences.",
            features: ["literary", "post-apocalyptic", "character-driven", "artistic themes"],
            adjustedByRatings: false,
            dynamicallyAdded: true
          },
          {
            id: 'dynamic-3',
            title: "The Night Circus",
            author: "Erin Morgenstern",
            genre: "Fantasy",
            description: "A competition between two young magicians plays out in a mysterious circus that only appears at night, creating a spellbinding atmosphere of magic and romance.",
            score: "7.5",
            similarityScore: "0.62",
            coverImage: "/api/placeholder/80/120",
            reasoning: "This immersive fantasy novel features intricate world-building and magical elements similar to books you've enjoyed. Its focus on atmosphere and wonder creates a unique reading experience.",
            features: ["fantasy", "magical", "atmospheric", "romance", "competition"],
            adjustedByRatings: false,
            dynamicallyAdded: true
          },
          {
            id: 'dynamic-4',
            title: "A Gentleman in Moscow",
            author: "Amor Towles",
            genre: "Historical Fiction",
            description: "In 1922, Count Alexander Rostov is sentenced to house arrest in a grand hotel across from the Kremlin, witnessing decades of Russian history from his confined quarters.",
            score: "7.8",
            similarityScore: "0.55",
            coverImage: "/api/placeholder/80/120",
            reasoning: "This character-rich historical novel offers a compelling blend of humor and historical insight, with beautiful prose similar to literary classics you've enjoyed.",
            features: ["historical", "literary", "character-driven", "20th century", "Russia"],
            adjustedByRatings: false,
            dynamicallyAdded: true
          },
          {
            id: 'dynamic-5',
            title: "The Three-Body Problem",
            author: "Liu Cixin",
            genre: "Science Fiction",
            description: "Set against the backdrop of China's Cultural Revolution, this hard science fiction novel explores humanity's first contact with an alien civilization on the brink of destruction.",
            score: "7.6",
            similarityScore: "0.65",
            coverImage: "/api/placeholder/80/120",
            reasoning: "This acclaimed science fiction novel blends hard science with philosophical questions about humanity and civilization, offering a fresh perspective on classic sci-fi themes.",
            features: ["science fiction", "first contact", "physics", "hard sci-fi", "translated"],
            adjustedByRatings: false,
            dynamicallyAdded: true
          },
          {
            id: 'dynamic-6',
            title: "Circe",
            author: "Madeline Miller",
            genre: "Fantasy",
            description: "A bold retelling of the story of Circe, the sorceress daughter of Helios who was exiled to a remote island where she hones her occult craft and encounters many famous figures from mythology.",
            score: "7.4",
            similarityScore: "0.59",
            coverImage: "/api/placeholder/80/120",
            reasoning: "This reimagining of Greek mythology features strong character development and beautiful prose, appealing to your interest in both fantasy and literary fiction.",
            features: ["fantasy", "mythology", "character-driven", "female protagonist", "reimagining"],
            adjustedByRatings: false,
            dynamicallyAdded: true
          },
          {
            id: 'dynamic-7',
            title: "Kindred",
            author: "Octavia E. Butler",
            genre: "Science Fiction",
            description: "A young African-American woman is unexpectedly pulled back in time to a pre-Civil War Maryland plantation, where she must protect her ancestor, a white slave owner.",
            score: "7.3",
            similarityScore: "0.57",
            coverImage: "/api/placeholder/80/120",
            reasoning: "This powerful blend of science fiction and historical fiction examines slavery and racism through a time-travel narrative, offering thought-provoking themes similar to other books you've enjoyed.",
            features: ["science fiction", "historical", "time travel", "race", "slavery"],
            adjustedByRatings: false,
            dynamicallyAdded: true
          }
        ];
        
        // Add books from preferred genres first
        const genreMatchedBooks = dynamicRecommendations.filter(book => 
          targetGenres.includes(book.genre)
        );
        
        // Add other books if needed
        const otherBooks = dynamicRecommendations.filter(book => 
          !targetGenres.includes(book.genre)
        );
        
        // Combine sorted recommendations with dynamic ones until we reach MIN_RECOMMENDATIONS
        const additionalBooksNeeded = MIN_RECOMMENDATIONS - sortedRecs.length;
        const additionalBooks = [...genreMatchedBooks, ...otherBooks].slice(0, additionalBooksNeeded);
        
        // Combine and set the final recommendations
        setRecommendations([...sortedRecs, ...additionalBooks]);
      } else {
        setRecommendations(sortedRecs);
      }
      
    }, [userBooks, readingList, feedbackMap]);
    
    return (
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg" style={{ background: colors.primary.lightGrey }}>
        <h1 className="text-3xl font-bold text-center mb-8 italic" style={{ 
          color: colors.primary.midnightBlue,
          fontFamily: 'serif',
          letterSpacing: '-0.04em',
          lineHeight: '1.25'
        }}>Book Recommendation App</h1>
        
        <BookForm 
          onAddBook={addToReadBooks} 
          bookDatabase={bookDatabase}
          colors={colors}
        />
        
        <StatsDashboard userBooks={userBooks} colors={colors} />
        
        <LibrarySection
          userBooks={userBooks}
          readingList={readingList}
          onRemoveBook={removeBook}
          onUpdateRating={updateBookRating}
          onRemoveFromList={removeFromReadingList}
          onMarkAsRead={markAsRead}
          onMoveToReadingList={moveToReadingList}
          onUpdatePosition={updateReadingListPosition}
          colors={colors}
        />
        
        <RecommendationList 
          recommendations={recommendations}
          onAddBook={addToReadingList}
          onFeedback={handleFeedback}
          onMarkAsRead={addToReadBooks}
          feedbackMap={feedbackMap}
          colors={colors}
          hasBooks={userBooks.length > 0 || readingList.length > 0}
        />
      </div>
    );
  };
  
  export default BookRecommendationApp;