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
                'types' => [
                    'ctaGrid' => [
                        'tabs' => [
                            [
                                'label' => 'Copy',
                                'fields' => ['heading', 'copy', 'button'],
                            ],
                            [
                                'label' => 'Cards',
                                'fields' => ['cards'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'ctaCards' => [
                        'tabs' => [
                            [
                                'label' => 'Copy',
                                'fields' => ['heading', 'copy', 'button'],
                            ],
                            [
                                'label' => 'Cards',
                                'fields' => ['cards'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'pullQuote' => [
                        'tabs' => [
                            [
                                'label' => 'Copy',
                                'fields' => ['quote', 'author', 'authorsTitle'],
                            ],
                            [
                                'label' => 'Assets',
                                'fields' => ['image'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'ctaBlogCards' => [
                        'tabs' => [
                            [
                                'label' => 'Copy',
                                'fields' => ['heading', 'copy', 'button'],
                            ],
                            [
                                'label' => 'Cards',
                                'fields' => ['cards'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'ctaBanner' => [
                        'tabs' => [
                            [
                                'label' => 'Copy',
                                'fields' => ['heading', 'copy', 'button'],
                            ],
                            [
                                'label' => 'Assets',
                                'fields' => ['backgroundImage'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'storyBlock' => [
                        'tabs' => [
                            [
                                'label' => 'Copy',
                                'fields' => ['heading', 'copy', 'customLink'],
                            ],
                            [
                                'label' => 'Assets',
                                'fields' => ['image'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'descriptiveList' => [
                        'tabs' => [
                            [
                                'label' => 'Copy',
                                'fields' => ['heading'],
                            ],
                            [
                                'label' => 'List',
                                'fields' => ['lists'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'statisticsShowcase' => [
                        'tabs' => [
                            [
                                'label' => 'Copy',
                                'fields' => ['heading'],
                            ],
                            [
                                'label' => 'Cards',
                                'fields' => ['cards'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'teamShowcase' => [
                        'tabs' => [
                            [
                                'label' => 'Copy',
                                'fields' => ['heading', 'copy'],
                            ],
                            [
                                'label' => 'Team',
                                'fields' => ['teamMembers'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'richText' => [
                        'tabs' => [
                            [
                                'label' => 'Copy',
                                'fields' => ['heading', 'headingPosition', 'copy'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'image' => [
                        'tabs' => [
                            [
                                'label' => 'Assets',
                                'fields' => ['image', 'cite'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'video' => [
                        'tabs' => [
                            [
                                'label' => 'Video Settings',
                                'fields' => ['videoProvider', 'videoId', 'thumbnailImage'],
                            ],
                            [
                                'label' => 'Copy',
                                'fields' => ['heading', 'copy'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'location' => [
                        'tabs' => [
                            [
                                'label' => 'Details',
                                'fields' => ['companyName', 'location', 'hoursOfOperation', 'directionsLink', 'contactEmail'],
                            ],
                            [
                                'label' => 'Map',
                                'fields' => ['map', 'mapImage'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
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
                'types' => [
                    'richText' => [
                        'tabs' => [
                            [
                                'label' => 'Copy',
                                'fields' => ['heading', 'headingPosition', 'copy'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'image' => [
                        'tabs' => [
                            [
                                'label' => 'Assets',
                                'fields' => ['image', 'cite'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'video' => [
                        'tabs' => [
                            [
                                'label' => 'Video Settings',
                                'fields' => ['videoProvider', 'videoId', 'thumbnailImage'],
                            ],
                            [
                                'label' => 'Copy',
                                'fields' => ['heading', 'copy'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'pullQuote' => [
                        'tabs' => [
                            [
                                'label' => 'Copy',
                                'fields' => ['quote', 'author', 'authorsTitle'],
                            ],
                            [
                                'label' => 'Assets',
                                'fields' => ['image'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'ctaBlogCards' => [
                        'tabs' => [
                            [
                                'label' => 'Copy',
                                'fields' => ['heading', 'copy', 'button'],
                            ],
                            [
                                'label' => 'Cards',
                                'fields' => ['cards'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                    'ctaBanner' => [
                        'tabs' => [
                            [
                                'label' => 'Copy',
                                'fields' => ['heading', 'copy', 'button'],
                            ],
                            [
                                'label' => 'Assets',
                                'fields' => ['backgroundImage'],
                            ],
                            [
                                'label' => 'Spacing',
                                'fields' => ['spacing'],
                            ]
                        ],
                        'defaultTabName' => 'Misc',
                    ],
                ],
                'hideUngroupedTypes' => true,
            ]
        ],
    ],
];
