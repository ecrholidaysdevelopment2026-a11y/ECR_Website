'use client';
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CustomCalendar = ({ dateRange, setDateRange, showFlexible = false, isMobile = false, blockedDates }) => {
    console.log(blockedDates);

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [nextMonth, setNextMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1));
    const [selectedRange, setSelectedRange] = useState({
        start: dateRange[0].startDate,
        end: dateRange[0].endDate
    });
    const [isSingleMonth, setIsSingleMonth] = useState(false);
    const blockedDatesSafe = Array.isArray(blockedDates) ? blockedDates : [];

    const getRangeInfo = (date) => {
        if (!date) return null;
        return blockedDatesSafe.find(block => {
            const start = new Date(block.startDate);
            const end = new Date(block.endDate);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            return date >= start && date <= end;
        });
    };




    const getBlockedInfo = (date) => {
        if (!date) return null;
        return blockedDatesSafe.find((block) => {
            const start = new Date(block.startDate);
            const end = new Date(block.endDate);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            return date >= start && date <= end && block.isBlocked !== false;
        });
    };


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

        const blocked = getBlockedInfo(date);
        if (blocked) return;

        if (!selectedRange.start || selectedRange.end) {
            setSelectedRange({ start: date, end: null });
        } else {
            let start = selectedRange.start;
            let end = date;

            if (start > date) [start, end] = [date, start];

            setSelectedRange({ start, end });

            setDateRange([
                {
                    startDate: start,
                    endDate: end,
                    key: "selection",
                },
            ]);
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
                        {currentMonthDays.map((date, index) => {
                            const blockedInfo = getBlockedInfo(date);
                            const rangeInfo = getRangeInfo(date);
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleDateClick(date)}
                                    disabled={!date || blockedInfo}
                                    className={`
          h-8 md:h-10 rounded md:rounded-lg flex items-center justify-center text-xs md:text-sm transition
          ${!date ? "invisible" : ""}
          ${blockedInfo ? "cursor-not-allowed text-white" : ""}
          ${isDateStart(date) ? "bg-blue-600 text-white" : ""}
          ${isDateEnd(date) ? "bg-blue-600 text-white" : ""}
          ${isDateInRange(date) && !blockedInfo ? "bg-blue-100" : ""}
        `}
                                    style={{
                                        backgroundColor: rangeInfo ? rangeInfo.color : undefined
                                    }}
                                >
                                    {date?.getDate()}
                                </button>
                            );
                        })}
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
                            {nextMonthDays.map((date, index) => {
                                const blockedInfo = getBlockedInfo(date);
                                const rangeInfo = getRangeInfo(date);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleDateClick(date)}
                                        disabled={!date || blockedInfo}
                                        className={`
        h-8 md:h-10 rounded md:rounded-lg flex items-center justify-center text-xs md:text-sm transition
        ${!date ? "invisible" : ""}
        ${blockedInfo ? "cursor-not-allowed opacity-80 text-white" : ""}
        ${isDateStart(date) ? "bg-blue-600 text-white" : ""}
        ${isDateEnd(date) ? "bg-blue-600 text-white" : ""}
        ${isDateInRange(date) && !blockedInfo ? "bg-blue-100" : ""}
      `}
                                        style={{
                                            backgroundColor: rangeInfo ? rangeInfo.color : undefined
                                        }}
                                    >
                                        {date?.getDate()}
                                    </button>
                                );
                            })}

                        </div>
                    </div>
                )}
            </div>
            <ul className="px-3 mt-3 flex flex-wrap gap-4">
                {blockedDatesSafe?.slice().map(item => (
                    <li key={item._id} className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-sm" style={{ background: item.color }} />
                        <span className="text-xs">{item.reason}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomCalendar;