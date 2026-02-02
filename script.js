(function($) {
  'use strict';

  // Плавная прокрутка к якорям
  $('.js-scroll-link').on('click', function(e) {
    var href = $(this).attr('href');
    if (href && href.indexOf('#') === 0) {
      e.preventDefault();
      var target = $(href);
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 600);
      }
    }
  });

  // Переключатель валют
  var currencySymbols = {
    RUB: '₽',
    UAH: '₴',
    USD: '$',
    EUR: '€'
  };

  function formatPrice(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  function setCurrency(currency) {
    $('.btn-currency').removeClass('active');
    $('.btn-currency[data-currency="' + currency + '"]').addClass('active');
    var symbol = currencySymbols[currency];

    $('.tariff-old-price').each(function() {
      var $el = $(this);
      var val = $el.data(currency.toLowerCase());
      if (val !== undefined) {
        $el.text(formatPrice(val) + ' ' + symbol);
      }
    });

    $('.tariff-current-price').each(function() {
      var $el = $(this);
      var val = $el.data(currency.toLowerCase());
      if (val !== undefined) {
        $el.text(formatPrice(val) + ' ' + symbol);
      }
    });
  }

  $('.btn-currency').on('click', function() {
    var currency = $(this).data('currency');
    setCurrency(currency);
  });

  // Модальное окно «Принять участие»
  var $tariffModal = $('#tariffModal');
  var $selectedTariffName = $('#selectedTariffName');

  $('.js-tariff-btn').on('click', function() {
    var tariffName = $(this).closest('.tariff-card').find('.tariff-name').text();
    $selectedTariffName.text(tariffName);
    $tariffModal.modal('show');
  });

  $('#submitTariffBtn').on('click', function() {
    var $form = $('#tariffForm');
    if ($form[0].checkValidity()) {
      // Здесь можно отправить форму на сервер
      alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      $tariffModal.modal('hide');
      $form[0].reset();
    } else {
      $form[0].reportValidity();
    }
  });

  // Модальное окно «Политика приватности»
  $('.js-privacy-link').on('click', function(e) {
    e.preventDefault();
    $('#privacyModal').modal('show');
  });

  // Список красок: показ/скрытие блока по клику, позиция рядом с кнопкой (на мобильных — по центру)
  $('.js-paints-toggle').on('click', function(e) {
    e.stopPropagation();
    var $block = $('.js-paints-block');
    var rect = this.getBoundingClientRect();
    if (window.innerWidth <= 767) {
      $block.css({
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      });
    } else {
      $block.css({
        top: (rect.top - 12) + 'px',
        left: (rect.left - 6) + 'px',
        transform: 'none'
      });
    }
    $block.addClass('is-open').attr('aria-hidden', 'false');
  });
  $('.js-paints-close').on('click', function(e) {
    e.stopPropagation();
    $('.js-paints-block').removeClass('is-open').attr('aria-hidden', 'true');
  });
  $(document).on('click', function() {
    $('.js-paints-block').removeClass('is-open').attr('aria-hidden', 'true');
  });
  $('.js-paints-block').on('click', function(e) {
    e.stopPropagation();
  });

  // Состояние заголовков FAQ при открытии/закрытии (класс collapsed для иконки)
  $('#faqAccordion').on('show.bs.collapse', function(e) {
    $(e.target).closest('.card').find('.card-header').removeClass('collapsed');
  });

  $('#faqAccordion').on('hide.bs.collapse', function(e) {
    $(e.target).closest('.card').find('.card-header').addClass('collapsed');
  });

  // Изначально первый вопрос открыт — у открытого убираем класс collapsed (для иконки −)
  $(document).ready(function() {
    $('#faqAccordion .collapse.show').closest('.card').find('.card-header').removeClass('collapsed');
    $('#faqAccordion .collapse:not(.show)').closest('.card').find('.card-header').addClass('collapsed');
  });

})(jQuery);
