import { useState } from 'react';
import { LocalStorageService } from '../services/local-storage-service';

const CARDS_IDS = 'likedCards'

const useLikeCard = () => {
  const [likedCardsIds, setLikedCardsIds] = useState([]);

  const changeCards = (createNewCards) => {
    const ids = LocalStorageService.get(CARDS_IDS, []);
    const newIds = createNewCards(ids);
    setLikedCardsIds(newIds);
    LocalStorageService.set(CARDS_IDS, newIds);
  }
  
  const addLikedCard = (cardId) => {
    changeCards(ids => [...ids, cardId]);
  };

  const removeLikedCard = (cardId) => {
    changeCards(ids => ids.filter(id => id !== cardId));
  };

  const isCardLiked = (cardId) => {
    const exisingLikedCards = LocalStorageService.get(CARDS_IDS, []);
    return exisingLikedCards.includes(cardId);
  };

  return {
    likedCards: likedCardsIds,
    addLikedCard,
    removeLikedCard,
    isCardLiked,
  };
};

export default useLikeCard;

