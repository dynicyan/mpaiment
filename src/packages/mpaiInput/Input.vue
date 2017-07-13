<template lang="pug">
	div(:class="[type === 'textarea' ? 'mp-textarea' : 'mp-input', size ? 'mp-input--' + size : '', {'is-labeled': labeled, 'is-disabled': disabled, 'is-circle': circled, 'is-valid': valided, 'mp-input-group': $slots.before || $slots.after, 'mp-input-before': $slots.before, 'mp-input-after': $slots.after}]")
		template(v-if="type !== 'textarea'")
			label(v-if="$slots.before && labeled" class='mp-before--label')
				slot(name='before')
				i(class='icon icon-close')
			span(:class="[{'is-top': isTop}]" v-if='$slots.before && !labeled' class='mp-input-group_before')
				slot(name='before')
			i(:class="['icon-' + icon, onIconClick ? 'is-clickable' : '']" v-if='icon' class='icon' @click="handleIconClick")
			input(@keyup.enter="handleIconClick" class='mp-inner--input' :placeholder='placeholder' :value='currentValue')
			span(v-if='$slots.after' class='mp-input-group_after')
				slot(name='after')
</template>
<script>
export default {
  name: 'mpInput',
  data () {
    return {
      currentValue: this.value
    }
  },
  props: {
    value: [String, Number],
    type: {
      type: String,
      defalut: 'input'
    },
    size: {
      type: String,
      defalut: 'defalut'
    },
    placeholder: String,
    icon: String,
    disabled: Boolean,
    circled: Boolean,
    labeled: Boolean,
    isTop: Boolean,
    valided: Boolean,
    defalutText: {
      type: String,
      defalut: '请输入关键词'
    },
    onIconClick: Function
  },
  methods: {
    handleIconClick (evt) {
      console.log(evt)
      if (this.onIconClick) {
        this.onIconClick(evt)
      }
      this.$emit('click', evt)
    },
    Search () {
      this.$emit('click')
    }
  }
}
</script>
<style lang="stylus">
.mp-input
	margin 10px 0
	border-radius 2px
	color #23232b
	.mp-inner--input
		padding 8px 12px
		height 20px
		width 302px
		line-height 20px
		font-size 13px
		border solid 1px #e1e1e1
		color #ffd600
		text-shadow 0px 0px 0px #23232b
		-webkit-text-fill-color transparent
		&:hover
			border-color #bababa
		&:focus
			border-color #ffd600
		&::-webkit-input-placeholder
			 text-shadow 0px 0px 0px #bababa
			 -webkit-text-fill-color initial
	.icon
	.mp-input-group_after
		position absolute
		width 68px
		height 105%
		border-radius 0 2px 2px 0
		right -1px
		top -1px
		background-color #ffd600
		cursor pointer
	.mp-input-group_before
		margin-right 12px
		font-size 13px
	.is-top
		display block
		margin-bottom 8px
.is-circle
	position relative
	width 328px
	.mp-inner--input
		border-radius 50px
	.icon
		width 28px
		height 28px
		border-radius 50%
		top 5px
		right 5px
		&:before
			position absolute
			top 50%
			left 50%
			transform translate(-50%,-50%)
.is-valid
	.mp-inner--input
		border-color #ff7b4d
		color #ff7b4d
		text-shadow 0px 0px 0px #23232b
		-webkit-text-fill-color transparent
		&:hover
			border-color #ff7b4d
		&:focus
			border-color #ff7b4d
			&:-webkit-input-placeholder
				 text-shadow none
				 -webkit-text-fill-color initial
.is-labeled
	padding 6px 4px
	border 1px solid #e1e1e1
	position relative
	display flex
	.mp-input-group_after
		text-align center
		line-height 44px
		font-size 14px
	.icon
		&:before
			position absolute
			top 50%
			left 50%
			transform translate(-50%,-50%)
	.mp-inner--input
		padding 0
		height 30px
		line-height 30px
		padding-left 16px
		font-size 14px
		border 0 none
		flex 1
	.mp-before--label
		padding 4px 12px
		height 20px
		line-height 20px
		font-size 13px
		background-color #f3f3f3
		border 1px solid #e1e1e1
		.icon
			display inline-block
			width 12px
			height 12px
			margin-left 8px
			border-radius 12px
			background-color #bababa
			color #fff
			position relative
			top 2px
		.icon-close
			&:before
				position absolute
				top 50%
				left 50%
				display inline-block
				transform translate(-48%,-48%) scale(0.5)
@keyframes rotating {
    0% {
        transform-origin: center center;
        transform:rotate(0deg);
    }
    100% {
        transform-origin: center center;
        transform:rotate(360deg);
    }
}
</style>
