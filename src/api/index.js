const DOCUMENTS_URL = `https://openlibrary.org/search/subjects.json`;
const BOOK_BY_AUTHOR_TITLE_URL = `https://openlibrary.org/search.json`;
const BOOK_BY_SUBJECT_URL = `https://openlibrary.org/subjects`;

async function getCachedData(cacheName, url) {
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(url);

  if (!cachedResponse || !cachedResponse.ok) {
    return false;
  }

  return cachedResponse.json();
}

export const getSubjectsListByQuery = async (query) => {
  const cacheName = `myapp-subjects`;
  const url = `${DOCUMENTS_URL}?q=${query}`;
  let cachedData = await getCachedData(cacheName, url);

  if (cachedData) {
    return cachedData;
  }

  const cacheStorage = await caches.open(cacheName);
  await cacheStorage.add(url);
  cachedData = await getCachedData(cacheName, url);

  return cachedData;
};

export const getBooksListByTitleAndAuthor = async (
  title,
  author,
  page = 1,
  limit = 10
) => {
  const cacheName = `myapp-books`;
  let url = `${BOOK_BY_AUTHOR_TITLE_URL}?`;
  if (title.trim().length) {
    url += `title=${title}`;
  }
  if (author.trim().length) {
    url += `&author=${author}`;
  }
  if (page) {
    url += `&page=${page}`;
  }
  if (limit) {
    url += `&limit=${limit}`;
  }

  let cachedData = await getCachedData(cacheName, url);

  if (cachedData) {
    return cachedData;
  }

  const cacheStorage = await caches.open(cacheName);

  await cacheStorage.add(url);
  cachedData = await getCachedData(cacheName, url);

  return cachedData;
};

export const getBooksListBySubject = async (
  subject,
  offset = 1,
  limit = 10
) => {
  subject = subject.split(' ').join('_');
  const cacheName = `myapp-books`;
  let url = `${BOOK_BY_SUBJECT_URL}/`;
  if (subject.trim().length) {
    url += `${subject.toLowerCase()}.json?details=true`;
  }
  if (offset) {
    url += `&offset=${offset}`;
  }
  if (limit) {
    url += `&limit=${limit}`;
  }
  let cachedData = await getCachedData(cacheName, url);

  if (cachedData) {
    return cachedData;
  }

  const cacheStorage = await caches.open(cacheName);
  await cacheStorage.add(url);
  cachedData = await getCachedData(cacheName, url);

  return cachedData;
};
