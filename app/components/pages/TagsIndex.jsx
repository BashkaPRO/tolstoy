import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import { translate } from 'app/Translator';
import { formatCoins } from 'app/utils/FormatCoins';
import { detransliterate } from 'app/utils/ParsersAndFormatters';

class TagsIndex extends React.Component {
    static propTypes = {
        tagsList: React.PropTypes.object.isRequired,
        tagsAll: React.PropTypes.object.isRequired,
        order: React.PropTypes.string,
    };

    state = { search: '' }

    shouldComponentUpdate(nextProps, nextState) {
        const res = this.props.tagsList !== nextProps.tagsList ||
            this.props.tagsAll !== nextProps.tagsAll ||
            this.props.order !== nextProps.order || this.state !== nextState;
        return res;
    }

    onChangeSearch = e => {
        this.setState({search: e.target.value})
    }

    render() {
        const {tagsAll} = this.props;
        //console.log('-- TagsIndex.render -->', tagsAll.toJS());
        //tagsAll.map(v => {
        //    console.log('-- map -->', v.toJS());
        //});
        const {search} = this.state;
        const order = this.props.routeParams.order;
        let tags = tagsAll;
        if (search) tags = tags.filter(tag => tag.get('name').indexOf(search.toLowerCase()) !== -1);
        tags.map((tag) => {console.log(tag.get('name'))})
        tags = tags.filter(tag => tag.get('name')).sort((a, b) => {
            return a.get('name').localeCompare(b.get('name'));
        }).map(tag => {
            const name = tag.get('name');
            const link = order ? `/${order}/${name}` : `/hot/${name}`;
            // const tag_info = tagsAll.get(tag);
            return (<tr key={name}>
                <td>
                    <Link to={link} activeClassName="active">{detransliterate(name)}</Link>
                </td>
                <td>{tag.get('discussions')}</td>
                <td>{formatCoins(tag.get('total_payouts'))}</td>
            </tr>);
        }).toArray();

        return (
            <div className="TagsIndex row">
                <div className="column">
                    <div className="medium-2 medium-offset-10 hidden">
                        <input type="text" placeholder={translate('filter')} value={search} onChange={this.onChangeSearch} />
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>{translate("tag")}</th>
                            <th>{translate("replies")}</th>
                            <th>{translate("payouts")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tags}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    tagsList: state.global.get('category_idx'),
    tagsAll: state.global.get('categories')
}))(TagsIndex);

module.exports = {
    path: 'tags.html(/:order)',
    component: connect(state => ({
        tagsList: state.global.get('category_idx'),
        tagsAll: state.global.get('categories')
    }))(TagsIndex)
};
