import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const prevBtn = `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>
  `;
    const nextBtn = `
  <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
  <span>Page ${curPage + 1}</span>
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
  </svg>
</button>
`;
    // Page 1 and other pages
    if (curPage === 1 && numPages > 1) {
      return nextBtn;
    }
    // Last Page
    if (curPage === numPages && numPages > 1) {
      return prevBtn;
    }
    // Other Page
    if (curPage < numPages) {
      return prevBtn.concat('', nextBtn);
    }
    // Page 1 and  No other pages
    return '';
  }
}

export default new PaginationView();
