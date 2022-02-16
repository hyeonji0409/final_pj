document.addEventListener('DOMContentLoaded', function () {
    // var calendarEl = document.getElementById('calendar');
    var calendarEl = $('#calendar')[0];

    var calendar = new FullCalendar.Calendar(calendarEl, {
        expandRows: true,
        /* Day 캘린더에서 시작 시간과 종료 시간 설정 */
        slotMinTime: '09:00',
        slotMaxTime: '20:00',
        headerToolbar: {

            left: "prev title next",
            right: 'dayGridMonth, listWeek'
        },
        initialView: 'dayGridMonth',
        timeZone: 'UTC',
        fixedWeekCount: false, // 해당 월의 주 만큼만 보여주기
        navLinks: false, // 날짜 누르면 해당 날짜의 일정 보여주게
        navLinkDayClick: function (date, jsEvent) {
            console.log("day", date.toISOString());
            console.log('coords', jsEvent.pageX, jsEvent.pageY)
        },
        dayMaxEvents: true, // 일정이 많을 경우 + more로 표기됨
        locale: 'ko',
        selectMirror: true,
        // 이벤트명 : function(){} : 각 날짜에 대한 이벤트를 통해 처리할 내용
        select: function(arg){
            console.log(arg);

            var title = prompt("입력할 일정: ");
            // title 값 있을 때, 화면에 calendar.addEvent() json 형식의 일정 추가
            if(title) {
                calendar.addEvent({
                    title: title,
                    start: arg.start,
                    end: arg.end,
                    allDay: arg.allDay
                })
            }
            calendar.unselect()
        },
        eventClick: function (arg) {
            // 있는 일정 클릭 시,
            console.log("#등록된 일정 클릭#");
            console.log(arg.event);
        },
        events: function(info, successCallback, failureCallback){
            $.ajax({
                type: "get",
                url: "/getSchedule",
                dataType: "json"
            })
        }
    });

    calendar.render();
});
