import { useState } from 'react';
import LocalStorageService from '../services/local-storage-service';

const CARDS_IDS = 'likedCards';

const useLikeCard = () => {
  const [likedCardsIds, setLikedCardsIds] = useState<string[]>([]);

  const changeCards = (createNewCards: (ids: string[]) => string[]) => {
    const ids = LocalStorageService.get<string[]>(CARDS_IDS, []) || [];
    const newIds = createNewCards(ids);
    setLikedCardsIds(newIds);
    LocalStorageService.set(CARDS_IDS, newIds);
  };

  const addLikedCard = (cardId: string) => {
    changeCards((ids: string[]) => [...ids, cardId]);
  };

  const removeLikedCard = (cardId: string) => {
    changeCards((ids: string[]) => ids.filter((id: string) => id !== cardId));
  };

  const isCardLiked = (cardId: string) => {
    const exisingLikedCards = LocalStorageService.get<string[]>(CARDS_IDS, []) || [];
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
