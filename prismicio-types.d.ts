import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

/**
 * Item in *Actualité → Autres images*
 */
export interface ArticleDocumentDataGalleryItem {
	/**
	 * Image field in *Actualité → Autres images*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: article.gallery[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Content for Actualité documents
 */
interface ArticleDocumentData {
	/**
	 * Titre field in *Actualité*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: article.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Date de publication field in *Actualité*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: article.date
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	date: prismic.DateField;
	
	/**
	 * Résumé (liste et partage) field in *Actualité*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Une ou deux phrases
	 * - **API ID Path**: article.excerpt
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	excerpt: prismic.KeyTextField;
	
	/**
	 * Image principale field in *Actualité*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: article.cover
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	cover: prismic.ImageField<never>;
	
	/**
	 * Contenu field in *Actualité*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: article.content
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
	
	/**
	 * Autres images field in *Actualité*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: article.gallery[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	gallery: prismic.GroupField<Simplify<ArticleDocumentDataGalleryItem>>;
	
	/**
	 * Lien du post LinkedIn field in *Actualité*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: article.linkedin_url
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	linkedin_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;/**
	 * Meta Title field in *Actualité*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: article.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Actualité*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: article.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Actualité*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: article.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Actualité document from Prismic
 *
 * - **API ID**: `article`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ArticleDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<ArticleDocumentData>, "article", Lang>;

/**
 * Item in *Accueil → Atouts*
 */
export interface HomeDocumentDataAboutSkillsItem {
	/**
	 * Icône (SVG) field in *Accueil → Atouts*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.about_skills[].icon
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	icon: prismic.ImageField<never>;
	
	/**
	 * Titre field in *Accueil → Atouts*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.about_skills[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *Accueil → Atouts*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.about_skills[].description
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	description: prismic.KeyTextField;
}

/**
 * Item in *Accueil → Services → Prestations*
 */
export interface HomeDocumentDataServicesQuestionsItem {
	/**
	 * Titre field in *Accueil → Services → Prestations*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.services[].questions[].question
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	question: prismic.KeyTextField;
	
	/**
	 * Image (optionnelle) field in *Accueil → Services → Prestations*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.services[].questions[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Texte field in *Accueil → Services → Prestations*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.services[].questions[].text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	text: prismic.RichTextField;
}

/**
 * Item in *Accueil → Services*
 */
export interface HomeDocumentDataServicesItem {
	/**
	 * Titre field in *Accueil → Services*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.services[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Image field in *Accueil → Services*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.services[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Prestations field in *Accueil → Services*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.services[].questions[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	questions: prismic.NestedGroupField<Simplify<HomeDocumentDataServicesQuestionsItem>>;
}

/**
 * Item in *Accueil → Cartes sécurité*
 */
export interface HomeDocumentDataSecurityCardsItem {
	/**
	 * Logo field in *Accueil → Cartes sécurité*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.security_cards[].logo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * Nom field in *Accueil → Cartes sécurité*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.security_cards[].text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
	
	/**
	 * Infobulle field in *Accueil → Cartes sécurité*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.security_cards[].tooltip_content
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	tooltip_content: prismic.KeyTextField;
	
	/**
	 * Popup – titre field in *Accueil → Cartes sécurité*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.security_cards[].popup_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	popup_title: prismic.KeyTextField;
	
	/**
	 * Popup – description field in *Accueil → Cartes sécurité*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.security_cards[].popup_description
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	popup_description: prismic.KeyTextField;
	
	/**
	 * Popup – image field in *Accueil → Cartes sécurité*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.security_cards[].popup_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	popup_image: prismic.ImageField<never>;
	
	/**
	 * Popup – icône field in *Accueil → Cartes sécurité*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.security_cards[].popup_icon
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	popup_icon: prismic.ImageField<never>;
}

/**
 * Item in *Accueil → Cartes qualifications*
 */
export interface HomeDocumentDataQualificationsCardsItem {
	/**
	 * Logo field in *Accueil → Cartes qualifications*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.qualifications_cards[].logo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * Nom field in *Accueil → Cartes qualifications*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.qualifications_cards[].text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
	
	/**
	 * Infobulle field in *Accueil → Cartes qualifications*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.qualifications_cards[].tooltip_content
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	tooltip_content: prismic.KeyTextField;
	
	/**
	 * Popup – titre field in *Accueil → Cartes qualifications*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.qualifications_cards[].popup_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	popup_title: prismic.KeyTextField;
	
	/**
	 * Popup – description field in *Accueil → Cartes qualifications*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.qualifications_cards[].popup_description
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	popup_description: prismic.KeyTextField;
	
	/**
	 * Popup – image field in *Accueil → Cartes qualifications*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.qualifications_cards[].popup_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	popup_image: prismic.ImageField<never>;
	
	/**
	 * Popup – icône field in *Accueil → Cartes qualifications*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.qualifications_cards[].popup_icon
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	popup_icon: prismic.ImageField<never>;
}

/**
 * Item in *Accueil → Machines*
 */
export interface HomeDocumentDataMachinesItem {
	/**
	 * Image field in *Accueil → Machines*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.machines[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Nom field in *Accueil → Machines*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.machines[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Fiche technique (PDF) field in *Accueil → Machines*
	 *
	 * - **Field Type**: Link to Media
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.machines[].technical_sheet
	 * - **Documentation**: https://prismic.io/docs/fields/link-to-media
	 */
	technical_sheet: prismic.LinkToMediaField<prismic.FieldState, never>;
	
	/**
	 * Bouton – texte field in *Accueil → Machines*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.machines[].button_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	button_text: prismic.KeyTextField;
	
	/**
	 * Bouton – style field in *Accueil → Machines*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: primary
	 * - **API ID Path**: home.machines[].button_variant
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	button_variant: prismic.SelectField<"primary" | "secondary" | "outline" | "outline-accent" | "accent-outline", "filled">;
	
	/**
	 * Bouton – afficher la flèche field in *Accueil → Machines*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: true
	 * - **API ID Path**: home.machines[].button_show_arrow
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	button_show_arrow: prismic.BooleanField;
}

/**
 * Item in *Accueil → Questions*
 */
export interface HomeDocumentDataFaqItemsItem {
	/**
	 * Question field in *Accueil → Questions*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.faq_items[].question
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	question: prismic.KeyTextField;
	
	/**
	 * Réponse field in *Accueil → Questions*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.faq_items[].answer
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	answer: prismic.RichTextField;
}

/**
 * Item in *Accueil → Liens légaux*
 */
export interface HomeDocumentDataLegalLinksItem {
	/**
	 * Texte field in *Accueil → Liens légaux*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.legal_links[].text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
	
	/**
	 * Lien field in *Accueil → Liens légaux*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: /mentions-legales
	 * - **API ID Path**: home.legal_links[].url
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	url: prismic.KeyTextField;
}

/**
 * Content for Accueil documents
 */
interface HomeDocumentData {
	/**
	 * Titre field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.hero_title
	 * - **Tab**: Hero
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	hero_title: prismic.KeyTextField;
	
	/**
	 * Description field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.hero_description
	 * - **Tab**: Hero
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	hero_description: prismic.KeyTextField;
	
	/**
	 * Bouton – texte field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.hero_button_text
	 * - **Tab**: Hero
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	hero_button_text: prismic.KeyTextField;
	
	/**
	 * Bouton – lien field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: https://…, /page ou mailto:contact@…
	 * - **API ID Path**: home.hero_button_url
	 * - **Tab**: Hero
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	hero_button_url: prismic.KeyTextField;
	
	/**
	 * Bouton – style field in *Accueil*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: primary
	 * - **API ID Path**: home.hero_button_variant
	 * - **Tab**: Hero
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	hero_button_variant: prismic.SelectField<"primary" | "secondary" | "outline" | "outline-accent" | "accent-outline", "filled">;
	
	/**
	 * Bouton – afficher la flèche field in *Accueil*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: true
	 * - **API ID Path**: home.hero_button_show_arrow
	 * - **Tab**: Hero
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	hero_button_show_arrow: prismic.BooleanField;/**
	 * Entre Hero et À propos – image (1920×1080 conseillé) field in *Accueil*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.hero_about_break_image
	 * - **Tab**: Images de séparation
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	hero_about_break_image: prismic.ImageField<never>;
	
	/**
	 * Entre Hero et À propos – qualité (1-100) field in *Accueil*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: 90
	 * - **API ID Path**: home.hero_about_break_quality
	 * - **Tab**: Images de séparation
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	hero_about_break_quality: prismic.NumberField;
	
	/**
	 * Entre Hero et À propos – chargement prioritaire field in *Accueil*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: true
	 * - **API ID Path**: home.hero_about_break_priority
	 * - **Tab**: Images de séparation
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	hero_about_break_priority: prismic.BooleanField;
	
	/**
	 * Entre Hero et À propos – intensité parallaxe field in *Accueil*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: 0.2
	 * - **API ID Path**: home.hero_about_break_parallax_strength
	 * - **Tab**: Images de séparation
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	hero_about_break_parallax_strength: prismic.NumberField;
	
	/**
	 * Entre Services et RSE – image (1920×1080 conseillé) field in *Accueil*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.services_rse_break_image
	 * - **Tab**: Images de séparation
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	services_rse_break_image: prismic.ImageField<never>;
	
	/**
	 * Entre Services et RSE – qualité (1-100) field in *Accueil*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: 90
	 * - **API ID Path**: home.services_rse_break_quality
	 * - **Tab**: Images de séparation
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	services_rse_break_quality: prismic.NumberField;
	
	/**
	 * Entre Services et RSE – chargement prioritaire field in *Accueil*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: true
	 * - **API ID Path**: home.services_rse_break_priority
	 * - **Tab**: Images de séparation
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	services_rse_break_priority: prismic.BooleanField;
	
	/**
	 * Entre Services et RSE – intensité parallaxe field in *Accueil*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: 0.2
	 * - **API ID Path**: home.services_rse_break_parallax_strength
	 * - **Tab**: Images de séparation
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	services_rse_break_parallax_strength: prismic.NumberField;/**
	 * Sur-titre field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.about_subtitle
	 * - **Tab**: À propos
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	about_subtitle: prismic.KeyTextField;
	
	/**
	 * Mot mis en avant field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.about_highlight
	 * - **Tab**: À propos
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	about_highlight: prismic.KeyTextField;
	
	/**
	 * Texte principal field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.about_main_text
	 * - **Tab**: À propos
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	about_main_text: prismic.KeyTextField;
	
	/**
	 * Image field in *Accueil*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.about_image
	 * - **Tab**: À propos
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	about_image: prismic.ImageField<never>;
	
	/**
	 * Atouts field in *Accueil*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.about_skills[]
	 * - **Tab**: À propos
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	about_skills: prismic.GroupField<Simplify<HomeDocumentDataAboutSkillsItem>>;/**
	 * Titre de la section field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.services_title
	 * - **Tab**: Services
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	services_title: prismic.KeyTextField;
	
	/**
	 * Services field in *Accueil*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.services[]
	 * - **Tab**: Services
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	services: prismic.GroupField<Simplify<HomeDocumentDataServicesItem>>;/**
	 * Étiquette field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.rse_tag_title
	 * - **Tab**: RSE
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	rse_tag_title: prismic.KeyTextField;
	
	/**
	 * Titre field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.rse_main_title
	 * - **Tab**: RSE
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	rse_main_title: prismic.KeyTextField;
	
	/**
	 * Description field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.rse_description
	 * - **Tab**: RSE
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	rse_description: prismic.KeyTextField;
	
	/**
	 * Note méthode field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.rse_method_note
	 * - **Tab**: RSE
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	rse_method_note: prismic.KeyTextField;
	
	/**
	 * Cartes sécurité field in *Accueil*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.security_cards[]
	 * - **Tab**: RSE
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	security_cards: prismic.GroupField<Simplify<HomeDocumentDataSecurityCardsItem>>;
	
	/**
	 * Cartes qualifications field in *Accueil*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.qualifications_cards[]
	 * - **Tab**: RSE
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	qualifications_cards: prismic.GroupField<Simplify<HomeDocumentDataQualificationsCardsItem>>;/**
	 * Étiquette field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.machines_tag_title
	 * - **Tab**: Machines
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	machines_tag_title: prismic.KeyTextField;
	
	/**
	 * Titre field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.machines_main_title
	 * - **Tab**: Machines
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	machines_main_title: prismic.KeyTextField;
	
	/**
	 * Machines field in *Accueil*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.machines[]
	 * - **Tab**: Machines
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	machines: prismic.GroupField<Simplify<HomeDocumentDataMachinesItem>>;/**
	 * Titre field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.faq_title
	 * - **Tab**: FAQ
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	faq_title: prismic.KeyTextField;
	
	/**
	 * Image field in *Accueil*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.faq_cover_image
	 * - **Tab**: FAQ
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	faq_cover_image: prismic.ImageField<never>;
	
	/**
	 * Questions field in *Accueil*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.faq_items[]
	 * - **Tab**: FAQ
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	faq_items: prismic.GroupField<Simplify<HomeDocumentDataFaqItemsItem>>;/**
	 * Titre de la carte field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.footer_title
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	footer_title: prismic.KeyTextField;
	
	/**
	 * Bouton – texte field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.footer_button_text
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	footer_button_text: prismic.KeyTextField;
	
	/**
	 * Bouton – lien field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: https://…, /page ou mailto:contact@…
	 * - **API ID Path**: home.footer_button_url
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	footer_button_url: prismic.KeyTextField;
	
	/**
	 * Bouton – style field in *Accueil*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: primary
	 * - **API ID Path**: home.footer_button_variant
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	footer_button_variant: prismic.SelectField<"primary" | "secondary" | "outline" | "outline-accent" | "accent-outline", "filled">;
	
	/**
	 * Bouton – afficher la flèche field in *Accueil*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: true
	 * - **API ID Path**: home.footer_button_show_arrow
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	footer_button_show_arrow: prismic.BooleanField;
	
	/**
	 * Nom de l'entreprise field in *Accueil*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.footer_company
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	footer_company: prismic.KeyTextField;
	
	/**
	 * Liens légaux field in *Accueil*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.legal_links[]
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	legal_links: prismic.GroupField<Simplify<HomeDocumentDataLegalLinksItem>>;
}

/**
 * Accueil document from Prismic
 *
 * - **API ID**: `home`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomeDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomeDocumentData>, "home", Lang>;

/**
 * Item in *Page légale → Sections*
 */
export interface LegalPageDocumentDataSectionsItem {
	/**
	 * Titre field in *Page légale → Sections*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal_page.sections[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Contenu field in *Page légale → Sections*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal_page.sections[].content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
}

/**
 * Content for Page légale documents
 */
interface LegalPageDocumentData {
	/**
	 * Titre field in *Page légale*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal_page.title
	 * - **Tab**: Contenu
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Sous-titre field in *Page légale*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal_page.subtitle
	 * - **Tab**: Contenu
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	subtitle: prismic.KeyTextField;
	
	/**
	 * Sections field in *Page légale*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal_page.sections[]
	 * - **Tab**: Contenu
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	sections: prismic.GroupField<Simplify<LegalPageDocumentDataSectionsItem>>;/**
	 * Meta Title field in *Page légale*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: legal_page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Page légale*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: legal_page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Page légale*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: legal_page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Page légale document from Prismic
 *
 * - **API ID**: `legal_page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type LegalPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<LegalPageDocumentData>, "legal_page", Lang>;

export type AllDocumentTypes = ArticleDocument | HomeDocument | LegalPageDocument;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			ArticleDocument,
			ArticleDocumentData,
			ArticleDocumentDataGalleryItem,
			HomeDocument,
			HomeDocumentData,
			HomeDocumentDataAboutSkillsItem,
			HomeDocumentDataServicesQuestionsItem,
			HomeDocumentDataServicesItem,
			HomeDocumentDataSecurityCardsItem,
			HomeDocumentDataQualificationsCardsItem,
			HomeDocumentDataMachinesItem,
			HomeDocumentDataFaqItemsItem,
			HomeDocumentDataLegalLinksItem,
			LegalPageDocument,
			LegalPageDocumentData,
			LegalPageDocumentDataSectionsItem,
			AllDocumentTypes
		}
	}
}