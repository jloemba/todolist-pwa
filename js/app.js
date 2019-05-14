import AppCard from '/js/components/card/card.js';
import { openDB } from 'idb';
import checkConnectivity from '/js/connection.js';

(async function(document) {
  const app = document.querySelector('#app');
  const skeleton = app.querySelector('.skeleton');
  const listPage = app.querySelector('[page=list]');

  checkConnectivity(3, 1000);
  
  document.addEventListener('connection-changed', ({ detail }) => {
    console.log(detail.online);
  });
  skeleton.removeAttribute('active');
  listPage.setAttribute('active', '');

  try {
    const data = await fetch('/data/spacex.json');
    const json = await data.json();

    const database = await openDB('app-store', 1, {
      upgrade(db) {
        db.createObjectStore('articles');
      }
    });

    if (navigator.onLine) {
      await database.put('articles', json, 'articles');
    }

    const articles = await database.get('articles', 'articles');
    
    const cards = json.map(item => {
      const cardElement = new AppCard();
  
      cardElement.initCard(item.image,
        item.placeholder,
        item.content.title,
        item.content.description);
  
      listPage.appendChild(cardElement);
  
      return cardElement;
    });

    document.addEventListener('add-favorit', async e => {
      const updatedArticle = articles.map(article => {
        article.content.title === e.detail.article ? article.favoris = true : article.favoris = false;
        return article;
      });

      await database.put('articles', updatedArticle, 'articles');
    });

    const callback = function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          card.swapImage();
        }
      });
    };
  
    const io = new IntersectionObserver(callback);
  
    cards.forEach(card => {
      io.observe(card);
    });
  } catch (error) {
    console.error(error, ':(');
  }
})(document);
