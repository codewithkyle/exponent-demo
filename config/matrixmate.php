<?php

return [
    'fields' => [
        'contentMatrix' => [
            '*' => [
                'groups' => [
                    [
                        'label' => 'Basic Content',
                        'types' => ['richText', 'image', 'video'],
                    ],
                    [
                        'label' => 'Content',
                        'types' => ['pullQuote', 'storyBlock', 'descriptiveList', 'statisticsShowcase', 'teamShowcase', 'location'],
                    ],
                    [
                        'label' => 'Calls to Action',
                        'types' => ['ctaGrid', 'ctaCards', 'ctaBlogCards', 'ctaBanner'],
                    ]
                ],
            ],
            'section:blog' => [
                'groups' => [
                    [
                        'label' => 'Basic Content',
                        'types' => ['richText', 'image', 'video', 'pullQuote'],
                    ],
                    [
                        'label' => 'Calls to Action',
                        'types' => ['ctaBlogCards', 'ctaBanner'],
                    ]
                ],
                'hideUngroupedTypes' => true,
            ]
        ],
    ],
];
