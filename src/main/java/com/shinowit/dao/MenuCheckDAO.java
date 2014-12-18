package com.shinowit.dao;

/**
 * Created by Administrator on 2014/12/6.
 */

import com.shinowit.entity.TAuMenuInfo;
import com.shinowit.entity.TreeNodeCheck;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


@Service
public class MenuCheckDAO {



    @Resource
    private SessionFactory sessionFactory;

    private void querySubModule(TreeNodeCheck parentNode){
        Session session=sessionFactory.openSession();
        String hql="from TAuMenuInfo s where s.parentId=?";
        Query query=session.createQuery(hql);
        query.setParameter(0,parentNode.getMenu().getMenuId());
        List<TAuMenuInfo> moduleList=query.list();
        session.close();
        for (TAuMenuInfo module:moduleList){
            TreeNodeCheck checknode=new TreeNodeCheck();
            checknode.setMenu(module);
            parentNode.addChild(checknode);
            querySubModule(checknode);
        }


    }

    @Transactional
    public TreeNodeCheck queryModule(String login_roleid){
        TreeNodeCheck result=new TreeNodeCheck();
        Session session=sessionFactory.openSession();

        String sql="select c.* from TAu_RoleInfo a inner join TAu_Authorization b on a.RoleID=b.RoleID inner join TAu_MenuInfo c ON B.MenuID=C.MenuID where a.RoleID=? and c.Module is null";
        Query query=session.createSQLQuery(sql).addEntity(TAuMenuInfo.class);
        query.setParameter(0 ,login_roleid);

        List<TAuMenuInfo> modeleList=query.list();
        session.close();

        for (TAuMenuInfo module:modeleList){
            TreeNodeCheck checknode=new TreeNodeCheck();
            checknode.setMenu(module);
            result.addChild(checknode);
            querySubModule(checknode);
        }

        return result;
    }
}
