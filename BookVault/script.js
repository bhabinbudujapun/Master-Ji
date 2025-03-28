class BooksLibrary {
  constructor() {
    this.apiUrl = "https://api.freeapi.app/api/v1/public/books";
    this.currentPage = 1;
    this.booksPerPage = 12;
    this.totalBooks = 0;
    this.books = [];
    this.fallbackImageUrl =
      "https://dummyimage.com/150x150/ccc/000&text=No+Image";
    this.init();
  }

  init() {
    this.elements = {
      searchInput: document.getElementById("searchInput"),
      sortSelect: document.getElementById("sortSelect"),
      booksContainer: document.getElementById("booksContainer"),
      prevBtn: document.getElementById("prevBtn"),
      nextBtn: document.getElementById("nextBtn"),
      currentPageSpan: document.getElementById("currentPage"),
      listViewBtn: document.getElementById("listViewBtn"),
      gridViewBtn: document.getElementById("gridViewBtn"),
    };

    this.setupEventListeners();
    this.fetchBooks();
  }

  setupEventListeners() {
    const {
      searchInput,
      sortSelect,
      prevBtn,
      nextBtn,
      listViewBtn,
      gridViewBtn,
    } = this.elements;
    searchInput.addEventListener("input", () => this.renderBooks());
    sortSelect.addEventListener("change", () => this.renderBooks());
    prevBtn.addEventListener("click", () => this.changePage(-1));
    nextBtn.addEventListener("click", () => this.changePage(1));
    listViewBtn.addEventListener("click", () => this.setView("list"));
    gridViewBtn.addEventListener("click", () => this.setView("grid"));
  }

  async fetchBooks() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const { data } = await response.json();
      if (!data?.data) throw new Error("Invalid books data");

      this.processBooks(data.data);
    } catch (error) {
      console.warn("API fetch failed, using fallback:", error);
      this.useFallbackData();
    }
  }

  processBooks(booksData) {
    this.books = booksData.map((book) => ({
      title: book.volumeInfo?.title || "Unknown Title",
      author: book.volumeInfo?.authors?.join(", ") || "Unknown Author",
      publisher: book.volumeInfo?.publisher || "Unknown Publisher",
      publishedDate: book.volumeInfo?.publishedDate || "Unknown Date",
      thumbnailUrl:
        book.volumeInfo?.imageLinks?.thumbnail || this.fallbackImageUrl,
      infoLink: book.volumeInfo?.infoLink || "#",
    }));

    this.totalBooks = this.books.length;
    this.renderBooks();
  }

  renderBooks() {
    const { searchInput, sortSelect, booksContainer } = this.elements;
    const searchTerm = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;

    let filteredBooks = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );

    // Sorting
    const sortOptions = {
      "title-asc": (a, b) => a.title.localeCompare(b.title),
      "title-desc": (a, b) => b.title.localeCompare(a.title),
      "date-asc": (a, b) =>
        new Date(a.publishedDate) - new Date(b.publishedDate),
      "date-desc": (a, b) =>
        new Date(b.publishedDate) - new Date(a.publishedDate),
    };
    filteredBooks.sort(sortOptions[sortValue] || (() => 0));

    // Pagination
    const startIndex = (this.currentPage - 1) * this.booksPerPage;
    const paginatedBooks = filteredBooks.slice(
      startIndex,
      startIndex + this.booksPerPage
    );

    booksContainer.innerHTML = paginatedBooks
      .map(
        (book) => `
      <div class="book-card" onclick="window.open('${book.infoLink}', '_blank')">
        <img src="${book.thumbnailUrl}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Publisher: ${book.publisher}</p>
        <p>Published: ${book.publishedDate}</p>
      </div>
    `
      )
      .join("");

    this.updatePagination();
  }

  setView(view) {
    const { booksContainer, listViewBtn, gridViewBtn } = this.elements;
    const isListView = view === "list";

    booksContainer.classList.toggle("list-view", isListView);
    booksContainer.classList.toggle("grid-view", !isListView);
    listViewBtn.classList.toggle("active", isListView);
    gridViewBtn.classList.toggle("active", !isListView);
  }
}

document.addEventListener("DOMContentLoaded", () => new BooksLibrary());
