function DaysRangeSearchStrategyFactory  (
      AdvancedCalendarDataService
    , LeadPriceCalendarDataService
) {
    return {
        createSearchStrategy: function (activeSearchWebService) {
            activeSearchWebService = activeSearchWebService || 'leadPriceCalendar';

            switch (activeSearchWebService) {
                case 'advancedCalendar':
                    return AdvancedCalendarDataService;
                case 'leadPriceCalendar':
                    return LeadPriceCalendarDataService;
                default:
                    throw new Error('unrecognized web service: ' + activeSearchWebService);
            }
        }
    };
}

export = DaysRangeSearchStrategyFactory;