import { faker as fakerDE } from '@faker-js/faker/locale/de';
import { faker as fakerEN } from '@faker-js/faker/locale/en';
import { faker as fakerFR } from '@faker-js/faker/locale/fr';
import { faker as fakerRU } from '@faker-js/faker/locale/ru';
import { faker as fakerES } from '@faker-js/faker/locale/es';

export const locales = {
    en: 'English',
    ru: 'Russian',
    de: 'German',
    fr: 'French',
    es: 'Spanish'
} as const;

export type Book = {
    id: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    description: string;
    reviews: Array<{
        rating: number;
        text: string;
        author: string;
    }>;
};

const fakerInstances = {
    en: fakerEN,
    ru: fakerRU,
    de: fakerDE,
    fr: fakerFR,
    es: fakerES
} as const;

type FakerInstance = typeof fakerEN | typeof fakerRU | typeof fakerDE | typeof fakerFR | typeof fakerES;

const generateReview = (faker: FakerInstance, rating: number) => ({
    rating,
    text: faker.lorem.paragraph(),
    author: faker.person.fullName(),
});

export const useBookGenerator = (seed: number, locale: keyof typeof locales, avgRating: number, numReviews: number) => {
    const faker = fakerInstances[locale];
    const rating = Math.ceil(avgRating);

    const generateBook = (id: number): Book => {
        faker.seed(seed + id);

        return {
            id,
            isbn: faker.commerce.isbn(),
            title: faker.commerce.productName(),
            author: faker.person.fullName(),
            publisher: faker.company.name(),
            description: faker.lorem.paragraphs(2),
            reviews: Array.from(
                { length: numReviews },
                () => generateReview(faker, rating)
            ),
        };
    };

    return { generateBook };
};