import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LikedCardsState {
  likedCards: string[];
  toggleLikedCard: (cardId: string) => void;
  isCardLiked: (cardId: string) => boolean;
}

const useLikedCards = create<LikedCardsState>()(
  persist(
    (set, get) => ({
      likedCards: [],
      toggleLikedCard: (cardId: string) => {
        const { likedCards } = get();
        const isLiked = likedCards.includes(cardId);
        set({
          likedCards: isLiked
            ? likedCards.filter((id) => id !== cardId)
            : [...likedCards, cardId],
        });
      },
      isCardLiked: (cardId: string) => get().likedCards.includes(cardId),
    }),
    {
      name: 'likedCards',
    },
  ),
);

export default useLikedCards;
