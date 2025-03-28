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
}

document.addEventListener("DOMContentLoaded", () => new BooksLibrary());
