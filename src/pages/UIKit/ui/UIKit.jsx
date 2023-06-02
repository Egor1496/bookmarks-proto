import React from "react";

import {
	BaseButton, BaseInput, BaseTextarea,
	BaseCheckbox, BaseRadiocheck,
	BaseToggleBox, BaseToggleRadio, BaseSwitchRadio,
	BaseSelect,
	MyLabel, Br, Grid, GridСell, Title,
} from "../../../shared/ui";

import {
	ColorsDemo
} from "../../../entities";

import { DiCodeigniter, DiJsBadge, DiHtml5, DiGithubBadge, DiNpm } from "react-icons/di";
import { SiCss3 } from "react-icons/si";
import { FaReact, FaYandex } from "react-icons/fa";
import { BiCodeAlt } from "react-icons/bi";
import { HiCheckCircle, HiMail } from "react-icons/hi";
import { IoAccessibilitySharp } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";

const baseSelectCss = {

};

const baseSelectOpt = {
	title: "Выбрать что-то",
	arrOption: ["что-то 1", "что-то 2", "что-то 3", "что-то 4", "что-то 5"],
	iconUrl: null
};

function UIKit() {
	return (
		<>
			<Br />
			<Grid>
				<GridСell>
					<Title text="Заголовок" type="h1" BorderStyle="left" />
					<Title text="Заголовок" type="h2" BorderStyle="left" />
					<BaseButton text="Кнопка" />
					<MyLabel labelText="Описание"><BaseInput defaultValue="По умолчанию"><HiCheckCircle /></BaseInput></MyLabel>
					<MyLabel labelText="Описание"><BaseTextarea placeholder="Пустой" /></MyLabel>
				</GridСell>
				<GridСell>
					<Title text="Заголовок" BorderStyle="borderTop"> <FaReact /> </Title>
					<Title text="Заголовок" BorderStyle="borderBottom"> <FaReact /> </Title>
					<BaseButton text="Кнопка" />
					<MyLabel labelText="Описание" ><BaseInput readonly placeholder="Пустой" /></MyLabel>
					<MyLabel labelText="Описание" ><BaseTextarea readonly defaultValue="По умолчанию" /></MyLabel>
				</GridСell>
				<GridСell>
					<Title text="Заголовок" floatIcon="iconRight" BorderStyle="borderleft"> <FaReact /> </Title>
					<Title text="Заголовок" floatIcon="iconRight" BorderStyle="borderRight"> <FaReact /> </Title>
					<BaseButton text="Кнопка" />
					<MyLabel labelText="Описание" ><BaseInput /></MyLabel>
					<MyLabel labelText="Описание" ><BaseTextarea /></MyLabel>
				</GridСell>
			</Grid >
			<Br />
			<Grid>
				<GridСell>
					<MyLabel labelText="Что выбрать" position="top"><BaseSelect styles={baseSelectCss} options={baseSelectOpt} /></MyLabel>
					<MyLabel labelText="Переключить" position="left"><BaseToggleBox /></MyLabel>
					<MyLabel labelText="Переключить" position="right"><BaseToggleRadio /></MyLabel></GridСell>
				<GridСell>
					<MyLabel labelText="Переключить"><BaseCheckbox /></MyLabel>
					<MyLabel labelText="Переключить" position="right"><BaseRadiocheck /></MyLabel>
					<MyLabel labelText="Переключить" position="bottom"><BaseSwitchRadio /></MyLabel>
				</GridСell>
				<GridСell>
					<MyLabel labelText="Переключить"><BaseCheckbox disabled /></MyLabel>
					<MyLabel labelText="Переключить" position="right"><BaseRadiocheck disabled /></MyLabel>
					<MyLabel labelText="Переключить" position="bottom"><BaseSwitchRadio disabled /></MyLabel>
				</GridСell>
			</Grid>
			<Br />
			<Grid>
				<GridСell>
					<BaseButton styleName="transparentStyle" text="Кнопка" ><DiHtml5 /></BaseButton>
					<BaseButton text="Жми" styleName="iconTop"><DiHtml5 /></BaseButton>
					<BaseButton text="Кнопка" styleName="iconRight"><SiCss3 /></BaseButton>
					<BaseButton text="Кнопка" styleName="iconLeft"><DiJsBadge /></BaseButton>
					<BaseButton text="Кнопка" styleName="iconBottom"><FaReact /></BaseButton>
				</GridСell>
				<GridСell>
					<BaseButton styleName="bigStyle" text="Кнопка" />
					<BaseButton styleName="bigStyle"><DiNpm /></BaseButton>
					<MyLabel labelText="Описание" position="right"><BaseButton><DiGithubBadge /></BaseButton></MyLabel>
					<MyLabel labelText="Описание" position="left"><BaseButton><BiCodeAlt /></BaseButton></MyLabel>
					<MyLabel labelText="Описание" position="bottom"><BaseButton ><FaYandex /></BaseButton></MyLabel>
				</GridСell>
				<GridСell>
					<BaseButton styleName="smallStyle" text="Кнопка" />
					<BaseButton disabled text="Жми" styleName="iconTop"><IoAccessibilitySharp /></BaseButton>
					<BaseButton disabled text="Кнопка" styleName="iconRight"><HiCheckCircle /></BaseButton>
					<BaseButton disabled text="Кнопка" styleName="iconLeft"><HiMail /></BaseButton>
					<BaseButton disabled text="Кнопка" styleName="iconBottom"><DiCodeigniter /></BaseButton>
				</GridСell>
			</Grid>
			<Br />
			<Grid>
				<GridСell>
					<BaseButton
						styleName="smallStyle"
						text="Видео">
						<IoMdPricetag style={{ transform: "translateY(1px)" }} />
					</BaseButton>
				</GridСell>
			</Grid>
			<Br />
			<ColorsDemo />
			<Br />
		</>
	);
}

export { UIKit };
