// Point d'entrée unique pour le contenu du site.
// CMS_SOURCE=prismic → Prismic, sinon WordPress (comportement actuel).
import * as wordpress from "@/lib/api";
import * as prismic from "@/lib/prismic";

const usePrismic = process.env.CMS_SOURCE === "prismic";

export const cmsSource = usePrismic ? "prismic" : "wordpress";

export const getHeroData = usePrismic ? prismic.getHeroData : wordpress.getHeroData;
export const getTitleAboutData = usePrismic
  ? prismic.getTitleAboutData
  : wordpress.getTitleAboutData;
export const getAboutData = usePrismic ? prismic.getAboutData : wordpress.getAboutData;
export const getServicesData = usePrismic
  ? prismic.getServicesData
  : wordpress.getServicesData;
export const getMachineData = usePrismic
  ? prismic.getMachineData
  : wordpress.getMachineData;
export const getImageBreakData = usePrismic
  ? prismic.getImageBreakData
  : wordpress.getImageBreakData;
export const getFooterData = usePrismic ? prismic.getFooterData : wordpress.getFooterData;
export const getRSEData = () =>
  usePrismic ? prismic.getRSERelatedData() : wordpress.getRSERelatedData("home");
export const getFaqData = () =>
  usePrismic ? prismic.getFaqData() : wordpress.getFaqData("home");
export const getLegalPage = usePrismic ? prismic.getLegalPage : wordpress.getLegalPage;
