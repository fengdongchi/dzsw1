package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/4.
 */
public class pieselectAction extends ActionSupport {
    private List<TMeMerchandiseInfo> list;
    @Resource
    private BaseDAO<TMeMerchandiseInfo> dao;

    public String select(){
        list=dao.listAll(TMeMerchandiseInfo.class);
        return SUCCESS;
    }

    public List<TMeMerchandiseInfo> getList() {
        return list;
    }

    public void setList(List<TMeMerchandiseInfo> list) {
        this.list = list;
    }
}
