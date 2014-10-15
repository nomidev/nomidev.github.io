(function ($, window, undefined) {
	var dbay = {
		deposit: 170000000,
		workTotal: 174386070,
		balance: 2030670,
		nomu: 3000000,
		brother: 4000000,
		trialCost: 150000,
		recompense: 1700000,
		getDividend: function (value) {
			return Math.floor(this.deposit / this.workTotal * value);
		},
		getNomuLegalFees: function () {
			return this.nomu / this.deposit;
		},
		getBrotherLegalFees: function () {
			return this.brother / this.deposit;
		},
		getBalance: function () {
			return Math.floor(this.balance / 24);
		},
		getTrialCost: function () {
			return this.trialCost - this.getBalance();
		},
		getRecompense: function () {
			return this.recompense / this.deposit;
		},
		commaNum: function (num) {
			var len, point, str;

			num = num + "";
			point = num.length % 3;
			len = num.length;
			str = num.substring(0, point);

			while (point < len) {  
				if (str != "") {
					str += ",";
				}
				str += num.substring(point, point + 3);
				point += 3;
			}
			return str;
		},
		init: function () {
			
			var test = function test() {
				console.dir(this);
			}

			test.apply(dbay);

			$('.workTotal').text(this.commaNum(this.workTotal));
			$('.deposit').text(this.commaNum(this.deposit));
			$('.nomu').text(this.commaNum(this.nomu));
			$('.brother').text(this.commaNum(this.brother));
			$('.balance').text(this.commaNum(this.balance));

			$('.myPay').on('keyup', function () {
				
				var that = this;

				($.proxy(function () {
					var val = $(that).val(),
						dividend = this.getDividend(val),
						nomusa = Math.floor(dividend * this.getNomuLegalFees()),
						brother = Math.floor(dividend * this.getBrotherLegalFees()),
						recompense = Math.floor(dividend * this.getRecompense()),
						receipt = dividend - nomusa - brother,
						legalFee = nomusa + brother,
						resultText = "";

					if(val.match(/^\d+$/)) {
						resultText += '<h2>내가 받을 금액은?</h2>';
						resultText += '<h3><strong class="myResult">' + this.commaNum(receipt + this.getBalance()) + '</strong>원 입니다.</h3>';
						resultText += '<p>배당금액: <strong>' + this.commaNum(dividend) + '</strong>원</p>';
						resultText += '<p>노무사 수임료 : <strong>' + this.commaNum(nomusa) + '</strong>원</p>';
						resultText += '<p>법무사 수임료 : <strong>' + this.commaNum(brother) + '</strong>원</p>';
						resultText += '<p>가압류 소송 비용 : <strong>' + this.commaNum(this.getTrialCost()) + '</strong>원</p>';
						resultText += '<p>총 지출 비용 : <strong>' + this.commaNum(nomusa + brother + this.getTrialCost()) + '</strong>원</p>';
						resultText += '<p>실 수령액은 수임료 <strong>' + this.commaNum(legalFee) + '</strong>원을 제외한 <strong>' + this.commaNum(receipt) + '</strong>원과 가압류 진행 비용 환급금 <strong>' + this.commaNum(this.getBalance()) + '</strong>원을 합한</p>';
						resultText += '<h3>총 <strong class="myResult">' + this.commaNum(receipt + this.getBalance()) + '</strong>원 입니다.</h3>';

						$('.result').html(resultText);
					} else {
						alert('숫자를 입력해주세요');
						$('.result').html(resultText);
					}
				}, dbay))();
			});
		}
	};

	$(document).ready(function () {
		dbay.init();
	});

})(jQuery, window)
