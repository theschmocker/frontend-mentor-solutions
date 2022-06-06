const baseUrl = 'https://restcountries.com/v3.1';

export async function getCountries(_fetch: Window['fetch'] = fetch): Promise<ListCountry[]> {
	const res = await _fetch(`${baseUrl}/all?fields=name,population,region,capital,flags,cca3`);
	const data = await res.json();
	return data;
}

export async function getCountriesByCca3(
	code: string[],
	_fetch: Window['fetch'] = fetch
): Promise<Country[]> {
	const res = await _fetch(`${baseUrl}/alpha/?codes=${code.join(',')}`);

	const data = await res.json();

	return data;
}

export async function getCountryByCca3(
	code: string,
	_fetch: Window['fetch'] = fetch
): Promise<Country | undefined> {
	const data = await getCountriesByCca3([code], _fetch);
	return data[0];
}

export type ListCountry = Pick<
	Country,
	'flags' | 'name' | 'capital' | 'region' | 'population' | 'cca3'
>;

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
