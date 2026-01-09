'use client';
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CustomCalendar = ({ dateRange, setDateRange, showFlexible = false, isMobile = false }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [nextMonth, setNextMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1));
    const [selectedRange, setSelectedRange] = useState({
        start: dateRange[0].startDate,
        end: dateRange[0].endDate
    });
    const [flexibleDays, setFlexibleDays] = useState(0);
    const [isSingleMonth, setIsSingleMonth] = useState(false);
    useEffect(() => {
        const checkScreenSize = () => {
            setIsSingleMonth(window.innerWidth < 768 || isMobile);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [isMobile]);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const generateCalendarDays = (year, month) => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const handleDateClick = (date) => {
        if (!date) return;

        if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
            setSelectedRange({ start: date, end: null });
        } else if (selectedRange.start && !selectedRange.end) {
            let start = selectedRange.start;
            let end = date;

            if (start > date) {
                [start, end] = [date, start];
            }

            setSelectedRange({ start, end });

            let finalStart = new Date(start);
            let finalEnd = new Date(end);

            if (flexibleDays > 0) {
                finalStart.setDate(finalStart.getDate() - flexibleDays);
                finalEnd.setDate(finalEnd.getDate() + flexibleDays);
            }

            setDateRange([{
                startDate: finalStart,
                endDate: finalEnd,
                key: "selection"
            }]);
        }
    };
    const isDateInRange = (date) => {
        if (!selectedRange.start || !date) return false;
        if (!selectedRange.end) return date.getTime() === selectedRange.start.getTime();

        const start = selectedRange.start < selectedRange.end ? selectedRange.start : selectedRange.end;
        const end = selectedRange.start < selectedRange.end ? selectedRange.end : selectedRange.start;

        return date >= start && date <= end;
    };

    const isDateStart = (date) => {
        return date && selectedRange.start && date.getTime() === selectedRange.start.getTime();
    };

    const isDateEnd = (date) => {
        return date && selectedRange.end && date.getTime() === selectedRange.end.getTime();
    };

    const handlePrevMonth = () => {
        const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
        setCurrentMonth(prevMonth);
        if (!isSingleMonth) {
            setNextMonth(new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
        }
    };

    const handleNextMonth = () => {
        const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
        setCurrentMonth(next);
        if (!isSingleMonth) {
            setNextMonth(new Date(next.getFullYear(), next.getMonth() + 1, 1));
        }
    };

    const currentMonthDays = generateCalendarDays(currentMonth.getFullYear(), currentMonth.getMonth());
    const nextMonthDays = isSingleMonth ? [] : generateCalendarDays(nextMonth.getFullYear(), nextMonth.getMonth());

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="custom-calendar w-full">
            {showFlexible && (
                <div className="mb-4 md:mb-6">
                    <div className="flex items-center justify-center gap-2 text-sm md:text-base">
                        <span className="font-semibold text-xl md:text-2xl text-center">
                            {selectedRange.start && selectedRange.end ? (
                                `${selectedRange.start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} → 
                                ${selectedRange.end.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`
                            ) : (
                                "Select dates"
                            )}
                        </span>
                    </div>
                </div>
            )}

            <div className={`flex ${isSingleMonth ? 'flex-col' : 'flex-col md:flex-row'} gap-4 md:gap-8`}>
                <div className={`${isSingleMonth ? 'w-full' : 'md:flex-1'}`}>
                    <div className="flex justify-between items-center mb-3 md:mb-4">
                        <button
                            onClick={handlePrevMonth}
                            className="p-1 md:p-2 hover:bg-gray-100 rounded-full transition"
                            aria-label="Previous month"
                        >
                            <FiChevronLeft size={isSingleMonth ? 18 : 20} />
                        </button>
                        <h3 className="text-base md:text-lg font-semibold">
                            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </h3>
                        {!isSingleMonth && <div className="w-8 md:w-10"></div>}
                        {isSingleMonth && (
                            <button
                                onClick={handleNextMonth}
                                className="p-1 md:p-2 hover:bg-gray-100 rounded-full transition"
                                aria-label="Next month"
                            >
                                <FiChevronRight size={isSingleMonth ? 18 : 20} />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-7 gap-0.5 md:gap-1 mb-1 md:mb-2">
                        {dayNames.map(day => (
                            <div key={day} className="text-center text-xs md:text-sm font-medium text-gray-500 py-1">
                                {isSingleMonth ? day.charAt(0) : day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-0.5 md:gap-1">
                        {currentMonthDays.map((date, index) => (
                            <button
                                key={index}
                                onClick={() => handleDateClick(date)}
                                className={`
                                    h-8 md:h-10 rounded md:rounded-lg flex items-center justify-center text-xs md:text-sm transition
                                    ${!date ? 'invisible' : ''}
                                    ${isDateStart(date) ? 'bg-blue-600 text-white rounded-l md:rounded-l-lg' : ''}
                                    ${isDateEnd(date) ? 'bg-blue-600 text-white rounded-r md:rounded-r-lg' : ''}
                                    ${isDateInRange(date) && !isDateStart(date) && !isDateEnd(date) ? 'bg-blue-100' : ''}
                                    ${date && date.getMonth() !== currentMonth.getMonth() ? 'text-gray-400' : 'text-gray-800'}
                                    ${date ? 'hover:bg-gray-100 active:scale-95' : ''}
                                    ${date && date.toDateString() === new Date().toDateString() ? 'border border-blue-500' : ''}
                                `}
                                disabled={!date}
                                aria-label={date ? `Select date ${date.toLocaleDateString()}` : 'Empty day'}
                            >
                                {date ? date.getDate() : ''}
                            </button>
                        ))}
                    </div>
                </div>
                {!isSingleMonth && (
                    <div className="md:flex-1">
                        <div className="flex justify-between items-center mb-3 md:mb-4">
                            <div className="w-8 md:w-10"></div>
                            <h3 className="text-base md:text-lg font-semibold">
                                {monthNames[nextMonth.getMonth()]} {nextMonth.getFullYear()}
                            </h3>
                            <button
                                onClick={handleNextMonth}
                                className="p-1 md:p-2 hover:bg-gray-100 rounded-full transition"
                                aria-label="Next month"
                            >
                                <FiChevronRight size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-0.5 md:gap-1 mb-1 md:mb-2">
                            {dayNames.map(day => (
                                <div key={day} className="text-center text-xs md:text-sm font-medium text-gray-500 py-1">
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-0.5 md:gap-1">
                            {nextMonthDays.map((date, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDateClick(date)}
                                    className={`
                                        h-8 md:h-10 rounded md:rounded-lg flex items-center justify-center text-xs md:text-sm transition
                                        ${!date ? 'invisible' : ''}
                                        ${isDateStart(date) ? 'bg-blue-600 text-white rounded-l md:rounded-l-lg' : ''}
                                        ${isDateEnd(date) ? 'bg-blue-600 text-white rounded-r md:rounded-r-lg' : ''}
                                        ${isDateInRange(date) && !isDateStart(date) && !isDateEnd(date) ? 'bg-blue-100' : ''}
                                        ${date && date.getMonth() !== nextMonth.getMonth() ? 'text-gray-400' : 'text-gray-800'}
                                        ${date ? 'hover:bg-gray-100 active:scale-95' : ''}
                                        ${date && date.toDateString() === new Date().toDateString() ? 'border border-blue-500' : ''}
                                    `}
                                    disabled={!date}
                                    aria-label={date ? `Select date ${date.toLocaleDateString()}` : 'Empty day'}
                                >
                                    {date ? date.getDate() : ''}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

           
        </div>
    );
};

export default CustomCalendar;