const baseUrl = 'https://restcountries.com/v3.1';

export async function getListCountries(_fetch: Window['fetch'] = fetch) {
	return getCountries(
		{ by: 'all', fields: ['name', 'population', 'region', 'capital', 'flags', 'cca3'] },
		_fetch
	);
}

export async function getCountryByCode(code: string, _fetch: Window['fetch']) {
	return (
		(
			await getCountries(
				{
					by: 'cca3',
					codes: [code],
					fields: [
						'name',
						'population',
						'region',
						'subregion',
						'borders',
						'capital',
						'tld',
						'flags',
						'currencies',
						'languages',
					],
				},
				_fetch
			)
		)[0] ?? null
	);
}

type Options<K extends keyof Country & string, Keys extends K[] = K[]> =
	| {
			by: 'all';
			fields?: Keys;
	  }
	| {
			by: 'cca3';
			fields?: Keys;
			codes: string[];
	  };

export async function getCountries<K extends keyof Country & string, Ks extends K[] = K[]>(
	options?: Options<K, Ks>,
	_fetch: Window['fetch'] = fetch
): Promise<{ [IncludedKey in Ks[number]]: Country[IncludedKey] }[]> {
	const { by, ...rest } = options ?? { by: 'all' };

	const url = new URL(baseUrl);
	url.pathname += by === 'all' ? '/all' : '/alpha';
	Object.entries(rest).forEach(([key, values]) => url.searchParams.append(key, values.join(',')));

	console.log(url.toString());

	const res = await _fetch(url.toString());
	const data = await res.json();
	return data;
}

export type CountryDetails = Awaited<ReturnType<typeof getCountryByCode>>;

export type ListCountry = Awaited<ReturnType<typeof getListCountries>>[number];

export interface Flags {
	png: string;
	svg: string;
}

export interface Name {
	common: string;
	official: string;
	nativeName: NativeName;
}

export type NativeName = Record<string, { official: string; common: string }>;

export interface Country {
	name: Name;
	tld: string[];
	cca2: string;
	ccn3: string;
	cca3: string;
	cioc: string;
	independent: boolean;
	status: string;
	unMember: boolean;
	currencies: Currencies;
	idd: Idd;
	capital: string[];
	altSpellings: string[];
	region: string;
	subregion: string;
	languages: Languages;
	translations: Translations;
	latlng: number[];
	landlocked: boolean;
	borders: string[];
	area: number;
	demonyms: Demonyms;
	flag: string;
	maps: Maps;
	population: number;
	gini: Gini;
	fifa: string;
	car: Car;
	timezones: string[];
	continents: string[];
	flags: Flags;
	coatOfArms: CoatOfArms;
	startOfWeek: string;
	capitalInfo: CapitalInfo;
	postalCode: PostalCode;
}

export interface Name {
	common: string;
	official: string;
	nativeName: NativeName;
}

export interface Spa {
	official: string;
	common: string;
}

export type Currencies = Record<
	string,
	{
		name: string;
		symbol: string;
	}
>;

export interface Idd {
	root: string;
	suffixes: string[];
}

export type Languages = Record<string, string>;

export type Translations = Record<
	string,
	{
		official: string;
		common: string;
	}
>;

export type Demonyms = Record<string, Demonym>;

export interface Demonym {
	f: string;
	m: string;
}

export interface Maps {
	googleMaps: string;
	openStreetMaps: string;
}

export type Gini = Record<string, number>;

export interface Car {
	signs: string[];
	side: string;
}

export interface Flags {
	png: string;
	svg: string;
}

export interface CoatOfArms {
	png: string;
	svg: string;
}

export interface CapitalInfo {
	latlng: number[];
}

export interface PostalCode {
	format: string;
	regex: string;
}
