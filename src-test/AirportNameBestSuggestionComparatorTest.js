define(['AirportNameBestSuggestionComparator'], function (Comparator) {
    "use strict";

    describe('autocomplete best suggestions', function () {

        it('full matching 3 letter airport IATA airport code always wins', function () {
            var comparator = new Comparator('KRK');
            var first = {
                label: "Krakow (KRK)",
                value: "KRK"
            };
            var second = {
                label: "Akron (AKO)",
                value: "AKO"
            };
            expect(comparator(first, second)).toBeGreaterThan(0);
        });

        it('prefer start of line matches over other position matches', function () {
            var comparator = new Comparator('KRAKOW');
            var startOfLineMatch = {
                label: "KRAKOW (XXX)",
                value: "XXX"
            };
            var inLineMatch = {
                label: "xxxxKRAKOWxxxxx (XXX)",
                value: "XXX"
            };
            expect(comparator(startOfLineMatch, inLineMatch)).toBeGreaterThan(0);
        });

        it('prefer start of line matches over other position matches ignore case', function () {
            var comparatorDifferentCase = new Comparator('Krakow');
            var startOfLineMatch = {
                label: "KRAKOW (XXX)",
                value: "XXX"
            };
            var inLineMatch = {
                label: "xxxxKRAKOWxxxxx (XXX)",
                value: "XXX"
            };
            expect(comparatorDifferentCase(startOfLineMatch, inLineMatch)).toBeGreaterThan(0);
        });

    });

    describe('autocomplete best suggestions use in sort sample suggestions array', function () {
        it('user starts typing full name', function () {
            var array = [
            {
                label: "Paso Delos Libres (AOL)",
                value: "AOL"
            },
            {
                label: "Klosters (ZHS)",
                value: "ZHS"
            },
            {
                label: "Los Angeles (LAX)",
                value: "LAX"
            },
            {
                label: "Volos (VOL)",
                value: "VOL"
            }
            ];

            var comparator = new Comparator("Los");

            array.sort(comparator);

            expect(array[array.length - 1].value).toBe('LAX');
        });
    });
});