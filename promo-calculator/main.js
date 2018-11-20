const worth = {
	s5: 60,
	s4: 12,
	s3: 3,
	s2: 1
}

$(function() {
	
	function refresh() {
		var held = {
			s5: $("input[name='held_s5']").val(),
			s4: $("input[name='held_s4']").val(),
			s3: $("input[name='held_s3']").val(),
			s2: $("input[name='held_s2']").val()
		}
		
		var need = {
			s5: $("input[name='need_s5']"),
			s4: $("input[name='need_s4']"),
			s3: $("input[name='need_s3']"),
			s2: $("input[name='need_s2']")
		}

		// Define total worth
		var total_worth = (worth.s5 * held.s5) + (worth.s4 * held.s4) + (worth.s3 * held.s3) + (worth.s2 * held.s2) 
		$("input[name='total_worth']").val(total_worth)
		
		need.s2.val(360-total_worth)
		need.s3.val((360-total_worth)/3)
		need.s4.val(((360-total_worth)/3)/4)
		need.s5.val((((360-total_worth)/3)/4)/5)
	}

	$("input").bind("DOMAttrModified input", function () {
		refresh()
	})
})