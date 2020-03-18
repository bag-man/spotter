require('source-map-support').install()
require('dotenv').config()

export const WORD_POINTS = 1
export const COMMENT_POINTS = 5
export const SUBMISSIONS_POINTS = 10
export const SCORE_THRESHOLD = 2000

export const BOTS = [
  '[deleted]',
  'AutoModerator',
  'SnapshillBot',
  'BotForceOne',
  'rConBot',
  'VredditDownloader',
  'TrumpTrainBot'
]
export const COMMENTS_API = 'https://api.pushshift.io/reddit/comment/search'
export const SUBMISSION_API = 'https://api.pushshift.io/reddit/submission/search'
export const HATE_WORDS = [
  'western values',
  'cultural marxism',
  'cultural marxist',
  'great replacement',
  'ethno state',
  'ethnostate',
  'white race',
  'white identity',
  'indentitarian',
  'indentitarians',
  'race realist',
  'race realism',
  'global elites',
  'global elite',
  'globalist',
  'holocaust',
  'spic',
  'nigger',
  'kike',
  'fag',
  'snowflake',
  'cuck',
]
export const HATE_SUBS = [
  'ThuleanPerspective',
  'eugenics',
  'whitebeauty',
  'diversity_is_racism',
  'whiteculturearchive',
  'goyfellas',
  'TradWife',
  'WhiteEthnostate',
  '200',
  '200acres',
  'AgainstDiversity',
  'CaucasianFellas',
  'ethnocommunity',
  'European',
  'NationalistsUnited',
  'NorthwestFront',
  'prorainbow',
  'Race_reality',
  'seededvermin',
  'StormfrontForums',
  'subforwhitepeopleonly',
  'ThuleSociety',
  'tradright',
  'White_Pride',
  'whiteanime',
  'WhiteIdentity',
  'whiteliberation',
  'WhiteNationalism',
  'whitereddit',
  'WhiteRights',
  'WhiteRights2',
  'WhiteRightsUK',
  'Whitetopia',
  'WightsOnly',
  'GenderCritical',
  'GCdebatesQT',
  'TrollGC',
  'GenderCynicalCritical',
  'GenderCriticalGuys',
  'actuallynotlesbians',
  'ActualStraightMen',
  'GenderCriticalTheory',
  'FascismForever',
  'DarkEnlightenment',
  'The3rdPosition',
  'National_Socialism',
  'hoppean',
  'keep_thereceipt',
  'fascistdiscussions',
  'anarcho_fascism',
  'Hoppe',
  'RedIcetv',
  'NationalBolshevik',
  'FascistRA',
  'eco_fascism',
  'strasserism',
  'strasserist',
  '3rdMusic',
  'BasedMusic',
  'BrentonTarrantFanClub',
  'danknatsocmemes',
  'DebateFascism',
  'Dontre_Hamilton',
  'ecofascism',
  'fascistsunited',
  'FashArt',
  'FashPropaganda',
  'Fashwave',
  'FullFascism',
  'Identitarians',
  'JamesAlexFields',
  'nazbol',
  'nazbol_gang',
  'nazbolgang',
  'nazi',
  'NewFash',
  'o9a',
  'ona',
  'Patriarchal_Anarchism',
  'readsiegebyjamesmason',
  'SiegeCulture',
  'the_nazi',
  'thefarright',
  'ZoomerWave',
  'yiffinhell',
  'greentea_party',
  'deathtoiran',
  'MestizoCrime',
  'noirish',
  'fenian',
  'beatingcripples',
  'fatpeoplehate',
  'furryhatefederation',
  'publichealthwatch',
  'rapingretards',
  'tardtales',
  'PinkpillFeminism',
  'nametheproblem',
  'WGTOW',
  'trufemcels',
  'FemaleSeparatism',
  'ChamonixAntiques',
  'worldpeace',
  'bombstrap',
  '255255255fellas',
  'billionshekelsupreme',
  'daddyworldhappy',
  'happyworlddaddy',
  'leroy',
  'milliondollarextreme',
  'ShoePolishPete',
  'socioeconomicfactors',
  'tha_pit',
  'tha_pit_pit',
  'tha_pit_pit_pit',
  'ThousandDenarRegime',
  'Tr1ll1onYanGXTreme',
  'TrillionShekelMaximum',
  'WhatsGoingOnBigGuy',
  'Drama',
  'WatchRedditDie',
  'DeuxRAMA',
  'DeclineIntoCensorship',
  'AgainstDegenerateSubs',
  'Average_AHS_User',
  'FreeSpeechWorld',
  'SpeechFree',
  'ZweiRama',
  'AgainstTrueHateSubs',
  'FragileLiberalMods',
  'BopMindsOfReddit',
  'Censorship2020',
  'GettingRacistsBanned',
  'gulpingsoylent',
  'ProHateSubreddits2',
  'eyeblech',
  'tapewormcentral',
  'mustardiarrhea',
  'Antifabruhfunny',
  'PeanutPunchingFanClub',
  'EasyCheesyBakedPotato',
  'boomerang_vot',
  'average_bruhfunnier',
  'bruhfunny',
  'bruhfunnysatellite',
  'Grillthrone',
  'Hardunpopularopinon',
  'NoRulesNirvana',
  'NOTALLOW',
  'TeamHeckleberry',
  'DarkHumorAndMemes',
  'dark_humor',
  'TruePoliticalHumor',
  'Stonetossingjuice',
  'topnotchshitposting',
  'darkmeme',
  'offensivememesboi',
  'edgydarkdankmemes',
  'dogeposting',
  'imgoingtohellforthis2',
  'TheNewOffensiveMemes',
  'wojak',
  'dogerightforever',
  'moreoffensivememes',
  'radicaledgymemes',
  'GodsChosenComics',
  'basedtiktok',
  'imgoingtohellforthis',
  'yesguymemes',
  'basedyesman',
  'dankmemeshell',
  'dogeright',
  'edgy',
  'edgymemes',
  'funny_kek_memes',
  'Hedgewik',
  'imgoingtoshellforthis',
  'kkkmoonman',
  'legomasteryoda',
  'legoyoda',
  'legoyodagang',
  'NordicYes',
  'offansivememes',
  'offensivememe',
  'offensivememes',
  'PebbleThrow',
  'racistjokes',
  'racistmemes',
  'stonetoss',
  'stonetosscomics',
  'veryoffensivememes',
  'DiversityNews',
  'altunitedkingdom',
  'HateCrimeHoaxes',
  'race',
  'alt_fakten',
  'new_right',
  'AltBuddhism',
  'European_new_right',
  'euromigration',
  'Antiglobalism',
  'antidiversity',
  'HoaxHateCrimes',
  'CulturalMarxism',
  'drwilliampierce',
  'GroypNation',
  'hardright',
  'multiculturalcancer',
  'polfacts',
  'rightist',
  'WhiteIdentity',
  'truegarfield',
  'kekistan',
  'apustaja',
  'frenrequests',
  'buddyplanet',
  'CLOWNFRENS',
  'ClownMilk',
  'DisabledReddit',
  'FrenParadise',
  'frenservatisim',
  'frensworld',
  'frenworld',
  'greenvswhite',
  'Honkler',
  'Honkpill',
  'rarefrens',
  'RFcollectors',
  'ShrewWorld',
  'thehonkpill',
  'Coomer',
  'ConsumeProduct',
  'GamersRiseUp',
  'DefinitelyNOTboogaloo',
  'Boomer',
  'ChocolateMilkcels',
  'Coomers',
  'DissidentSubculture',
  '13do50',
  'ZoomersRiseUp',
  'RagingHumanist',
  'OkCoomer',
  'TempleOperatingSystem',
  'ThisIsFascism',
  'libcels',
  'late_stage_diversity',
  '1350IsPrettyNifty',
  'AbandonedMcDonaldsTX',
  'AntiPECollective',
  'AntiPOZi',
  'BasedGenZ',
  'bug_world',
  'Clown__World',
  'Clown_World_',
  'ClownWorldStar',
  'Clownworldwar',
  'CringeAnarchy',
  'CringeAnarcy',
  'CringeAnarky',
  'CringeChaos',
  'CringeManarchy',
  'ElixirMelanodermToll',
  'EpicAirConditioners',
  'GenZ_Politics',
  'GenZRight',
  'GenZuncensored',
  'HulkHoganFans',
  'KampfGruppeZ',
  'OurGreatestStrength',
  'paradigmshift2070',
  'pissearth',
  'pissearthbegins',
  'promisedsub',
  'ReyKillzPalpatine',
  'RightwingGenZ',
  'Socioeconomics',
  'stopnoticingthings',
  'ZoomerRight',
  'ZoomerSSHotep',
  'ShitNeoconsSay',
  'jewishcontributions',
  'CharlsWorld',
  'theunBEARables',
  'FellowRetrievers',
  'JIDF',
  'holohoax',
  'LateZionism',
  'GoyInformed',
  'americanjewishpower',
  'britishjewishpower',
  'eze',
  'fornoreasonatall',
  'fragilejewishredditor',
  'gasthekikes',
  'generation_zyklon',
  'GentilesUnited',
  'GoodGoys',
  'GoyimDefenceForce',
  'HappyMerchantMemes',
  'holocaust',
  'holocaustrevision',
  'IHateJewishPeople',
  'JewishPower',
  'JewishQuestion',
  'kike',
  'killallfuckinjews',
  'merchantmemes',
  'SoricidaeDiscussion',
  'TennisGorilla',
  'TheGoyimKnow',
  'ZOG',
  'fuckislam',
  'ShariaLaw',
  'islamunveiled',
  'taqiya',
  'Londonistan',
  'muzzies',
  'InfidelsUnited',
  'Quranimals',
  'rapefugees',
  'subofpeace',
  'average_redditor',
  'ShitPoliticsSays',
  'Shuffles_Deck',
  'averageredditor',
  'libtard',
  'MenKampf',
  'liberaldegeneracy',
  'ProudMaleFeminists',
  'ShufflesDeck',
  'smuggies',
  'smuggies2',
  'LGBDropTheT',
  'itsafetish',
  'PedoGate',
  'AverageTransgender',
  'NewPride',
  'therearetwogenders',
  'antilgbtqplus2',
  '2fuckinggenders',
  'againstthelgbtq',
  'AntiLGBTbullshit',
  'AntiLGBTQplus',
  'antitraa',
  'average_tranny',
  'DropTheTea',
  'ForTransRights',
  'hardunpopularopinion',
  'Homophobes',
  'JuggaloPlanet',
  'NeovaginaDisasters',
  'none_lgbt',
  'onlytwogenders',
  'ScienceSays2Genders',
  'StopLGBTpreach',
  'thereareonly2genders',
  'TrannyPlanet',
  'Transrights',
  'troomer',
  'ExposingLeftism',
  'LeftistWatch',
  'antifainaction',
  'terroristsofreddit',
  'latestagesocialism',
  'tumblrinaction',
  'antifa',
  'antifascist',
  'ChapoTrapHouse88',
  'holodomor',
  'physical_removal',
  'physicalremoval',
  'shortcels',
  'kotakuinaction2',
  'WhereAreAllTheGoodMen',
  'Communitycels',
  'soyboys',
  'antifeminists',
  'BrapBarn',
  'FeminismStopsWhen',
  'BlackPillScience',
  'mgtowchristian',
  'socialjusticeinaction',
  'mgtow',
  'the_wall',
  'kotakuinaction',
  'beatingwomen',
  'beatingwomen2',
  'blackpillcentral',
  'braincels',
  'Celouts',
  'chadfish',
  'chadfishreborn',
  'DarwinsDisgraced',
  'incels',
  'JustBeWhite',
  'JustBWhite',
  'lgbtcels',
  'misogyny',
  'rapingwomen',
  'sjwhate',
  'theredpill',
  'HBD',
  'NiggerJokes',
  'FragileKneeGrows',
  'blackteenagersraw',
  'beholdWAKANDA',
  'coons',
  'raceandintelligence',
  'AFragileBlackRedditor',
  'AgainstDomesticAbuse',
  'Apefrica',
  'apeniggers',
  'ApeWrangling',
  'BlackCrime',
  'blackcrime2',
  'blackcrimestatistics',
  'BlackFathers',
  'BlackHusbands',
  'ChimpireMETA',
  'ChimpireOfftopic',
  'ChimpMusic',
  'Chimpout',
  'coontown',
  'Detoilet',
  'didntdonuffins',
  'DigitalAgeNiggers',
  'FragileBlckRedditor',
  'FunnyNigger',
  'FunnyNiggers',
  'gibsmedat',
  'GoEbola',
  'GreatAbos',
  'GreatApes',
  'HateBlackPeople',
  'HBDStats',
  'ihateniggers420',
  'JustBlackGirlThings',
  'kangznsheeit',
  'muhdick',
  'n1ggers',
  'NegroFree',
  'NGTOW',
  'niggerandhitlerjokes',
  'NiggerCartoons',
  'NiggerDocumentaries',
  'NiggerDrama',
  'NiggerFacts',
  'NiggerFaggotsUnited',
  'NiggerHistoryMonth',
  'NiggerMythology',
  'niggerrebooted',
  'niggers',
  'niggersfacts',
  'NiggersGIFs',
  'NiggersNews',
  'NiggersPics',
  'NiggersStories',
  'NiggersTIL',
  'niggerthanyouthought',
  'NiggerTIL',
  'NiggerVideos',
  'niglets',
  'nigs',
  'QueensAndShit',
  'RacistNiggers',
  'ShitNiggersSay',
  'Strange_Statistics',
  'StrangerStatistics',
  'StrangeStatistics',
  'Teenapers',
  'TheRacistRedPill',
  'theyrejustlikeus',
  'TNB',
  'transrace',
  'TrayvonMartin',
  'USBlackCulture',
  'WatchNiggersDie',
  'WhitesWinFights',
  'WorldStarHP',
  'WTFNiggers',
  'owenbenjamin',
  'DebateAltRight',
  'tucker_carlson',
  'GavinMcInnes',
  'LouderWithCrowder',
  'DrainTheSwamp',
  'MisterMetokur',
  'Canada_First',
  'RIGHTCAST',
  'styxhexenhammer666',
  'weternbetrayal',
  'WeekendGunnit',
  'altrightsub',
  'altrightfitness',
  'AFwithNJF',
  'AltRightChristian',
  'NickerNation',
  'The_Donald',
  'metacanada',
  'trump',
  'DrainTheSwamp',
  'TheNewRight',
  'HillaryForPrison',
  'irredeemables',
  'PeoplesPartyofCanada',
  'The_Donald_CA',
  'ukipparty',
  'TommyRobinson',
  'de_thierry',
  'the_europe',
  'the_farage',
  'donald_trump',
  'BritishNationalParty',
  'VisegradGroup',
  'The_Italia',
  'ChrysiAvgi',
  'identityirelandforum',
  'Pegida_Ireland',
  'GoldenDawn',
  'le_pen',
  'metacanadatwo',
  'Mr_Trump',
  'swedenyes',
  'The_DonaldUnleashed',
  'TheDonald_',
  'conspiracy',
  'QTheory',
  'greatawakening',
  'qanon',
]

/* eslint-disable */
export const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK!
const { REDDIT_USER_AGENT, REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USERNAME, REDDIT_PASSWORD } = process.env

export const CREDENTIALS = {
  user_agent: REDDIT_USER_AGENT!,
   o2a: {
    client_id: REDDIT_CLIENT_ID!,
    client_secret: REDDIT_CLIENT_SECRET!,
    username: REDDIT_USERNAME!,
    password: REDDIT_PASSWORD!,
  }
}

