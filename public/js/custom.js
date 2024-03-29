function loadJsDefault(){
  KTUtil.ready(function () {
  
      // Init Desktop & Mobile Headers
      KTLayoutHeader.init('kt_header', 'kt_header_mobile');
  
      // Init Header Menu
      KTLayoutHeaderMenu.init('kt_header_menu', 'kt_header_menu_wrapper');
  
      // Init Header Topbar For Mobile Mode
      KTLayoutHeaderTopbar.init('kt_header_mobile_topbar_toggle');
  
      // Init Aside
      KTLayoutAside.init('kt_aside');
  
      // Init Subheader
      KTLayoutSubheader.init('kt_subheader');
  
      // Init Content
      KTLayoutContent.init('kt_content');
  
      // Init Footer
      KTLayoutFooter.init('kt_footer');
  });
  moment.locale('vi');
  $('#kt_aside_toggle').on('click', function () {
    window.dispatchEvent(new Event('resize'));
  })
  
  $('.aside').on('mouseenter', function () {
    if ($('body').hasClass('aside-minimize')) {
      window.dispatchEvent(new Event('resize'));
    }
  })
  
  $('.aside').on('mouseleave', function () {
    if ($('body').hasClass('aside-minimize-hover')) {
      window.dispatchEvent(new Event('resize'));
    }
  })
  
  
  $(document).ready(function () {
    $('.selectpicker').selectpicker({
      container: 'body',
    });
    $('.selectpicker').on('shown.bs.select', function (e) {
      $('.bs-container.dropdown').addClass('shown')
    });
  
    $('[data-toast=toast]').on('click', function () {
      var id = $(this).attr('toast-target');
      $(id).toast('show')
    })
    $('.toast').toast({
      delay: 5000
    })
  
    window.addEventListener('scroll', function (e) {
      var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
      if (scrollTop >= 64) {
        document.querySelector('body').classList.add('sidebar-stuck')
      } else {
        document.querySelector('body').classList.remove('sidebar-stuck')
      }
    })
    $('.datepicker-date-time').daterangepicker({
      buttonClasses: ' btn',
      applyClass: 'btn-primary',
      cancelClass: 'btn-secondary',
  
      timePicker: true,
      timePickerIncrement: 10,
      timePicker24Hour: true,
      locale: {
        format: 'DD/MM/YYYY H:mm',
        applyLabel: "Chọn",
        cancelLabel: "Huỷ",
        fromLabel: "Từ",
        toLabel: "Đến",
        customRangeLabel: "Tuỳ chỉnh",
      }
    });
  
    $('.datepicker-date').daterangepicker({
      buttonClasses: ' btn',
      applyClass: 'btn-primary',
      cancelClass: 'btn-secondary',
      autoApply: true,
      locale: {
        format: 'DD/MM/YYYY',
        applyLabel: "Chọn",
        cancelLabel: "Huỷ",
        fromLabel: "Từ",
        toLabel: "Đến",
        customRangeLabel: "Tuỳ chỉnh",
      }
    });
  
    $('[data-tooltip]').tooltip({
      container: 'body',
      boundary: 'window',
      html: true
    });
  })
  
  $('.timepicker').timepicker({
    minuteStep: 1,
    defaultTime: '',
    showSeconds: true,
    showMeridian: false,
    snapToStep: true,
    icons: {
      up: 'ri-arrow-up-s-line',
      down: 'ri-arrow-down-s-line'
    }
  });
  
  //====================STAR autosize INIT=================//
  autosize(document.querySelectorAll('.textarea-autosize'));
  
  //====================TABLES=================//
  $('.table-responsive-new .table-wrap-inner').scroll(function (e) {
    var _this = this;
    if (_this.scrollWidth === (_this.scrollLeft + _this.clientWidth)) {
      $(_this).addClass('right-none');
    }
    else {
      $(_this).removeClass('right-none');
    };
  
    if (_this.scrollLeft === 0) {
      $(_this).addClass('left-none');
    }
    else {
      $(_this).removeClass('left-none');
    };
  }).scroll();
  
  var maxWidth = 180;
  var tableCellsTd = document.querySelectorAll('td');
  var tableCellsTh = document.querySelectorAll('th');
  
  function tableCell (el) {
    for (x = 0; x < el.length; x++) {
      if (el[x].clientWidth > maxWidth && el[x].closest('.table').offsetWidth > el[x].closest('.table-wrap-inner').offsetWidth) {
        el[x].classList.add("cell-long");
        el[x].style.minWidth = maxWidth + 'px'
      }
    }
  }
  
  tableCell(tableCellsTd)
  tableCell(tableCellsTh)
  //====================END TABLES=================//
  
  // expand
  $('.expand-btn').on('click', function () {
    $(this).closest('.expand-wrap').find('.expand-list > *:nth-child(n + 4)').toggleClass('d-none')
    $(this).toggleClass('expand')
  })
  
  $('.rnc-show-triger').on('change', function () {
    if ($(this).is(':checked')) {
      $(this).closest('.rnc-show-wrap').find('.rnc-show-content').removeClass('d-none')
    } else {
      $(this).closest('.rnc-show-wrap').find('.rnc-show-content').addClass('d-none')
    }
  })
  // end expand
}
function initChart(){
    var color = {
      default: '#212121',
      default2: '#B5B5C3',
      secondary: '#E5EAEE',
      primary: '#0071A9',
      red: '#C91D1D',
      border: '#E5EAEE',
      invert: '#ffffff',
      grey4: '#FAFBFB'
    }
    Highcharts.chart('pieChart', {
      credits: false,
      chart: {
        spacingTop: 30,
        spacingBottom: 0,
        height: 315,
        type: 'pie',
        style: {
          fontSize: '14px',
          fontFamily: 'Inter'
        }
      },
      title: {
        text: null
      },
      tooltip: {
        headerFormat: '<span class="hc-tooltip-title">{point.key}</span><table class="hc-table">',
        pointFormat: '<tr><td><b>{point.y:f} %</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        backgroundColor: 'rgba(255,255,255,1)',
        useHTML: true,
        borderWidth: 0,
        borderRadius: 6,
        outside: true,
        shadow: {
          color: '#000',
          offsetX: 0,
          offsety: 8,
          opacity: 0.015,
          width: 8
        },
        style: {
          color: color.default,
          fontSize: '14px'
        }
      },
      legend: {
        symbolHeight: 15,
        padding: 20,
        color: color.default2,
        itemStyle: {
          color: color.default,
          fontWeight: '400'
        }
      },
      plotOptions: {
        pie: {
          borderWidth: 0,
          states: {
            inactive: {
              opacity: 1
            }
          }
        }
      },
      series: [{
        type: 'pie',
        size: '100%',
        innerSize: '60%',
        showInLegend: true,
        shadow: {
          opacity: 0.008,
          offsetY: 0,
          width: 16
        },
        dataLabels: {
          enabled: false
        },
        dataLabels: {
          style: {
            fontSize: '16px'
          },
          formatter: function() {
            // display only if larger than 1
            return this.y > 1 ?
              this.y + '%' :
              null;
          }
        },
        data: [{
          name: 'Trong mức',
          y: 75,
          color: color.primary
        }, {
          name: 'Vượt mức',
          y: 25,
          color: color.red
        }]
      }]
    });
    Highcharts.chart('colChart', {
      credits: false,
      chart: {
        spacingTop: 30,
        spacingBottom: 0,
        height: 315,
        type: 'column',
        style: {
          fontSize: '14px',
          fontFamily: 'Inter'
        }
      },
      title: {
        text: null
      },
      xAxis: {
        lineColor: 'rgba(0,0,0,0)',
        margin: 30,
        zIndex: 1,
        categories: [
          '1/2021',
          '2/2021',
          '3/2021',
          '4/2021',
          '5/2021',
          '6/2021',
          '7/2021',
          '8/2021',
          '9/2021',
          '10/2021',
          '11/2021',
          '12/2021'
        ],
        crosshair: {
          color: color.secondary,
          zIndex: -1
        },
        labels: {
          style: {
            fontSize: '12px',
            color: color.default2
          }
        }
      },
      yAxis: {
        title: {
          text: null
        },
        tickInterval: 100,
        gridLineColor: color.border,
        gridLineDashStyle: 'Dash',
        labels: {
          style: {
            fontSize: '12px',
            color: color.default2
          }
        }
      },
      tooltip: {
        headerFormat: '<span class="hc-tooltip-title">{point.key}</span><table class="hc-table">',
        pointFormat: '<tr><td><span class="hc-dot" style="background:{series.color}"></span></td><td style="padding:0">{series.name}: </td>' + '<td><b>{point.y:f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        backgroundColor: 'rgba(255,255,255,1)',
        useHTML: true,
        borderWidth: 0,
        borderRadius: 6,
        outside: true,
        shadow: {
          color: '#000',
          offsetX: 0,
          offsety: 8,
          opacity: 0.015,
          width: 8
        },
        style: {
          color: color.default
        }
      },
      legend: {
        reversed: true,
        symbolHeight: 15,
        symbolPadding: 8,
        padding: 20,
        color: color.default2,
        itemStyle: {
          color: color.default,
          fontWeight: 400
        }
      },
      plotOptions: {
        column: {
          borderWidth: 0,
          stacking: 'normal'
        }
      },
      series: [{
        name: 'Vượt mức',
        color: color.red,
        dataLabels: [{
          align: 'right',
          format: '{this}'
        }],
        data: [
          57,
          58,
          59,
          60,
          42,
          30,
          49,
          58,
          60,
          62,
          65,
          22
        ],
        stack: '1'
      }, {
        name: 'Trong Mức',
        color: color.primary,
        dataLabels: [{
          align: 'right',
          format: '{this}'
        }],
        data: [
          570,
          580,
          590,
          600,
          420,
          302,
          493,
          580,
          600,
          620,
          650,
          220
        ],
        stack: '1'
      }]
    });
}
